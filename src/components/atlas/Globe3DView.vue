<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as THREE from 'three'
import type { GeoArc, GeoItem, GeoRegionCluster } from '../../data/geoCoordinates'
import { chinaGeoJson, worldCountriesGeoJson } from '../../data/chinaGeoJson'

const props = defineProps<{
  items: GeoItem[]
  selectedItem: GeoItem | null
  arcs: GeoArc[]
  showArcs: boolean
  activeCluster: GeoRegionCluster | null
}>()

const emit = defineEmits<{
  (e: 'select', item: GeoItem): void
}>()

const canvasContainer = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let animId: number = 0

const GLOBE_RADIUS = 100
let globeGroup: THREE.Group | null = null
let bordersGroup: THREE.Group | null = null
let pinsGroup: THREE.Group | null = null
let arcsGroup: THREE.Group | null = null
let photonsGroup: THREE.Group | null = null

// 物理动量与阻尼旋转
let isPointerDown = false
let pointerDownPos = { x: 0, y: 0 }
let previousPointerPos = { x: 0, y: 0 }
let angularVelocity = { x: 0, y: 0.001 }
let isFlying = false
let targetQuaternion = new THREE.Quaternion()
let currentZoom = 250
let targetZoom = 250

// 实时遥测 HUD 状态
const telemetry = ref({
  lat: '34.34°N',
  lng: '108.94°E',
  azimuth: '128°',
  altitude: '250 km',
  fps: 60,
  targetName: '中国兵工科研走廊',
})

// 经纬度 -> 3D 球面坐标
function latLngToVector3(lat: number, lng: number, radius = GLOBE_RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

// 动态生成地标 Canvas 2D Sprite 纹理（悬浮微标签）
function createBadgeSprite(item: GeoItem, isSelected = false): THREE.Sprite {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')!

  const isUni = item.type === 'university'
  const bgColor = isSelected ? '#eb7c65' : isUni ? 'rgba(37, 99, 235, 0.88)' : 'rgba(190, 85, 67, 0.88)'
  const textColor = '#ffffff'

  // 绘制圆角矩形胶囊底
  ctx.fillStyle = bgColor
  ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'
  ctx.lineWidth = isSelected ? 4 : 2

  const r = 18
  const w = 240
  const h = 48
  const x = 8
  const y = 8

  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // 绘制文字
  ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const icon = isUni ? '🏛️ ' : '🏭 '
  const displayName = item.name.length > 8 ? item.name.slice(0, 7) + '..' : item.name
  ctx.fillText(`${icon}${displayName}`, 128, 32)

  const texture = new THREE.CanvasTexture(canvas)
  texture.minFilter = THREE.LinearFilter
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  })
  const sprite = new THREE.Sprite(spriteMat)
  sprite.scale.set(16, 4, 1)
  return sprite
}

// 初始化 3D 引擎场景
function initScene() {
  if (!canvasContainer.value) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight || 580

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.z = currentZoom

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  globeGroup = new THREE.Group()
  scene.add(globeGroup)

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'

  // 1. 地球核心球体 (高质感金属曜石球体)
  const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64)
  const sphereMat = new THREE.MeshPhongMaterial({
    color: isDark ? 0x0c110e : 0xf0f5f2,
    emissive: isDark ? 0x050806 : 0xd6e0db,
    specular: isDark ? 0x22332a : 0xffffff,
    shininess: 25,
    transparent: true,
    opacity: 0.98,
  })
  const earthMesh = new THREE.Mesh(sphereGeo, sphereMat)
  globeGroup.add(earthMesh)

  // 2. 菲涅尔全息大气光晕
  const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.05, 32, 32)
  const atmosMat = new THREE.MeshBasicMaterial({
    color: isDark ? 0xeb7c65 : 0xbe5543,
    transparent: true,
    opacity: isDark ? 0.12 : 0.08,
    side: THREE.BackSide,
  })
  const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat)
  globeGroup.add(atmosMesh)

  // 3. 经纬度极简刻度环
  const gridGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(GLOBE_RADIUS * 1.001, 36, 18))
  const gridMat = new THREE.LineBasicMaterial({
    color: isDark ? 0x25362e : 0xc0d0c8,
    transparent: true,
    opacity: 0.25,
  })
  const gridMesh = new THREE.LineSegments(gridGeo, gridMat)
  globeGroup.add(gridMesh)

  // 4. 灯光系统
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
  scene.add(ambientLight)

  const sunLight = new THREE.DirectionalLight(0xffeedd, 2.5)
  sunLight.position.set(250, 180, 300)
  scene.add(sunLight)

  const backLight = new THREE.DirectionalLight(0xeb7c65, 0.9)
  backLight.position.set(-200, -150, -250)
  scene.add(backLight)

  // 5. 挂载子容器
  bordersGroup = new THREE.Group()
  pinsGroup = new THREE.Group()
  arcsGroup = new THREE.Group()
  photonsGroup = new THREE.Group()

  globeGroup.add(bordersGroup)
  globeGroup.add(pinsGroup)
  globeGroup.add(arcsGroup)
  globeGroup.add(photonsGroup)

  // 构建真实的全球大陆与中国 34 省高精轮廓
  buildRealGeoBoundaries(isDark)

  // 挂载地标与飞线
  updatePins()
  updateArcs()

  // 初始镜头定焦至中国核心区域
  setTargetOrientation(34.34, 108.94, 250)

  animate()
}

// 构建真实的全球大陆与中国 34 省高精矢量轮廓
function buildRealGeoBoundaries(isDark: boolean) {
  if (!bordersGroup) return

  // A. 全球大陆海岸线 (暗灰微发光轮廓)
  const worldMat = new THREE.LineBasicMaterial({
    color: isDark ? 0x3d5247 : 0xa8b8b0,
    transparent: true,
    opacity: 0.45,
  })

  if (worldCountriesGeoJson && worldCountriesGeoJson.features) {
    worldCountriesGeoJson.features.forEach((feature: any) => {
      const { geometry } = feature
      if (!geometry) return
      const coordsList = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates || []

      coordsList.forEach((polygon: any) => {
        polygon.forEach((ring: [number, number][]) => {
          const points: THREE.Vector3[] = []
          for (let i = 0; i < ring.length; i++) {
            const [lng, lat] = ring[i]
            points.push(latLngToVector3(lat, lng, GLOBE_RADIUS * 1.002))
          }
          if (points.length > 2) {
            const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
            bordersGroup?.add(new THREE.Line(lineGeo, worldMat))
          }
        })
      })
    })
  }

  // B. 中国 34 省真实高精度矢量边界 (亮色高饱和高亮)
  const chinaMat = new THREE.LineBasicMaterial({
    color: isDark ? 0xeb7c65 : 0xbe5543,
    transparent: true,
    opacity: 0.95,
  })

  if (chinaGeoJson && chinaGeoJson.features) {
    chinaGeoJson.features.forEach((feature: any) => {
      const { geometry } = feature
      if (!geometry) return
      const coordsList = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates || []

      coordsList.forEach((polygon: any) => {
        polygon.forEach((ring: [number, number][]) => {
          const points: THREE.Vector3[] = []
          for (let i = 0; i < ring.length; i++) {
            const [lng, lat] = ring[i]
            points.push(latLngToVector3(lat, lng, GLOBE_RADIUS * 1.003))
          }
          if (points.length > 2) {
            const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
            bordersGroup?.add(new THREE.Line(lineGeo, chinaMat))
          }
        })
      })
    })
  }
}

// 更新复合 3D 标牌 (引线柱 + 地面波 + 悬浮 Sprite 标签)
function updatePins() {
  if (!pinsGroup) return
  while (pinsGroup.children.length > 0) {
    const obj = pinsGroup.children[0]
    pinsGroup.remove(obj)
  }

  props.items.forEach((item) => {
    const isSelected = props.selectedItem?.id === item.id
    const isUni = item.type === 'university'
    const colorHex = isSelected ? 0xffffff : isUni ? 0x3b82f6 : 0xeb7c65
    const pos = latLngToVector3(item.lat, item.lng, GLOBE_RADIUS)

    // 1. 激光引线柱
    const pillarHeight = isSelected ? 12 : isUni ? 8 : 6
    const pillarGeo = new THREE.CylinderGeometry(0.4, 0.1, pillarHeight, 8)
    const pillarMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.9,
    })
    const pillar = new THREE.Mesh(pillarGeo, pillarMat)
    pillar.position.copy(pos.clone().multiplyScalar(1 + pillarHeight / (2 * GLOBE_RADIUS)))
    pillar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize())
    pillar.userData = { item }

    // 2. 地面扩散光环
    const ringGeo = new THREE.RingGeometry(0.8, 1.8, 16)
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.position.copy(pos.clone().multiplyScalar(1.004))
    ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize())

    // 3. 悬浮 Canvas 徽章标签 (Sprite)
    const sprite = createBadgeSprite(item, isSelected)
    sprite.position.copy(pos.clone().multiplyScalar(1 + (pillarHeight + 3) / GLOBE_RADIUS))
    sprite.userData = { item }

    pinsGroup?.add(pillar)
    pinsGroup?.add(ring)
    pinsGroup?.add(sprite)
  })
}

// 抛物线飞线与动态光子
const arcCurves: { curve: THREE.QuadraticBezierCurve3; photonMesh: THREE.Mesh; color: string }[] = []

function updateArcs() {
  if (!arcsGroup || !photonsGroup) return
  while (arcsGroup.children.length > 0) arcsGroup.remove(arcsGroup.children[0])
  while (photonsGroup.children.length > 0) photonsGroup.remove(photonsGroup.children[0])
  arcCurves.length = 0

  if (!props.showArcs) return

  props.arcs.forEach((arc) => {
    const p1 = latLngToVector3(arc.fromCoords[1], arc.fromCoords[0], GLOBE_RADIUS)
    const p2 = latLngToVector3(arc.toCoords[1], arc.toCoords[0], GLOBE_RADIUS)

    const mid = p1.clone().add(p2).multiplyScalar(0.5)
    const dist = p1.distanceTo(p2)
    const altitude = dist * 0.35 + 8
    mid.normalize().multiplyScalar(GLOBE_RADIUS + altitude)

    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
    const points = curve.getPoints(48)
    const arcGeo = new THREE.BufferGeometry().setFromPoints(points)
    const arcMat = new THREE.LineBasicMaterial({
      color: arc.color ? parseInt(arc.color.replace('#', '0x')) : 0xeb7c65,
      transparent: true,
      opacity: 0.75,
    })
    const arcLine = new THREE.Line(arcGeo, arcMat)
    arcsGroup?.add(arcLine)

    // 飞线上的发光光子粒子
    const photonGeo = new THREE.SphereGeometry(1.2, 8, 8)
    const photonMat = new THREE.MeshBasicMaterial({
      color: arc.color ? parseInt(arc.color.replace('#', '0x')) : 0xffffff,
    })
    const photonMesh = new THREE.Mesh(photonGeo, photonMat)
    photonsGroup?.add(photonMesh)

    arcCurves.push({ curve, photonMesh, color: arc.color || '#eb7c65' })
  })
}

// 电影级飞行定焦函数 (Slerp)
function setTargetOrientation(lat: number, lng: number, zoomLevel = 220) {
  isFlying = true
  targetZoom = zoomLevel
  telemetry.value.lat = `${lat.toFixed(2)}°N`
  telemetry.value.lng = `${lng.toFixed(2)}°E`
  telemetry.value.altitude = `${zoomLevel} km`

  // 构造目标旋转四元数
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const euler = new THREE.Euler(phi - Math.PI / 2, -theta - Math.PI / 2, 0, 'YXZ')
  targetQuaternion.setFromEuler(euler)
}

// 监听聚集区定焦与地标选中
watch(
  () => props.activeCluster,
  (cluster) => {
    if (!cluster) return
    telemetry.value.targetName = cluster.name
    if (cluster.id === 'all') {
      setTargetOrientation(34.34, 108.94, 250)
    } else {
      setTargetOrientation(cluster.center[1], cluster.center[0], 190)
    }
  },
)

watch(
  () => props.selectedItem,
  (item) => {
    updatePins()
    if (item) {
      telemetry.value.targetName = `[${item.type === 'university' ? '高校' : '企业'}] ${item.name}`
      setTargetOrientation(item.lat, item.lng, 180)
    }
  },
)

watch(() => props.items, updatePins, { deep: true })
watch(() => props.showArcs, updateArcs)

// 交互手势处理 (动量物理阻尼)
function onPointerDown(e: MouseEvent | TouchEvent) {
  isPointerDown = true
  isFlying = false
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  pointerDownPos = { x: clientX, y: clientY }
  previousPointerPos = { x: clientX, y: clientY }
  angularVelocity = { x: 0, y: 0 }
}

function onPointerMove(e: MouseEvent | TouchEvent) {
  if (!isPointerDown || !globeGroup) return
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  const deltaX = clientX - previousPointerPos.x
  const deltaY = clientY - previousPointerPos.y

  angularVelocity.y = deltaX * 0.0045
  angularVelocity.x = deltaY * 0.0045

  globeGroup.rotation.y += angularVelocity.y
  globeGroup.rotation.x += angularVelocity.x
  globeGroup.rotation.x = Math.max(-1.2, Math.min(1.2, globeGroup.rotation.x))

  previousPointerPos = { x: clientX, y: clientY }
}

function onPointerUp(e: MouseEvent | TouchEvent) {
  isPointerDown = false
  if (!canvasContainer.value || !camera || !pinsGroup) return
  const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX
  const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY

  // 判断是否为点击事件（位移小于 5px）
  const moveDist = Math.hypot(clientX - pointerDownPos.x, clientY - pointerDownPos.y)
  if (moveDist < 6) {
    const rect = canvasContainer.value.getBoundingClientRect()
    const mouse = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    )

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(pinsGroup.children, true)

    if (intersects.length > 0) {
      const hitObj = intersects[0].object
      if (hitObj.userData?.item) {
        emit('select', hitObj.userData.item)
      }
    }
  }
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  targetZoom += e.deltaY * 0.15
  targetZoom = Math.max(130, Math.min(380, targetZoom))
  telemetry.value.altitude = `${Math.round(targetZoom)} km`
}

function onResize() {
  if (!canvasContainer.value || !camera || !renderer) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight || 580
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// 动画主循环
function animate() {
  animId = requestAnimationFrame(animate)
  const now = performance.now()

  if (globeGroup) {
    if (isFlying) {
      // 电影级四元数球面平滑定焦 (Slerp)
      globeGroup.quaternion.slerp(targetQuaternion, 0.06)
      if (globeGroup.quaternion.angleTo(targetQuaternion) < 0.005) {
        isFlying = false
      }
    } else if (!isPointerDown) {
      // 动量阻尼减速 + 微自转
      angularVelocity.x *= 0.94
      angularVelocity.y *= 0.94
      if (Math.abs(angularVelocity.y) < 0.0001) angularVelocity.y = 0.0006

      globeGroup.rotation.y += angularVelocity.y
      globeGroup.rotation.x += angularVelocity.x
      globeGroup.rotation.x = Math.max(-1.2, Math.min(1.2, globeGroup.rotation.x))
    }
  }

  // 缩放平滑阻尼
  if (camera) {
    currentZoom += (targetZoom - currentZoom) * 0.08
    camera.position.z = currentZoom
  }

  // 飞线光子沿轨迹飞行
  const time = now * 0.001
  arcCurves.forEach((item, index) => {
    const t = (time * 0.35 + index * 0.15) % 1
    const p = item.curve.getPoint(t)
    item.photonMesh.position.copy(p)
  })

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

onMounted(() => {
  initScene()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
  if (renderer && renderer.domElement) {
    renderer.dispose()
    renderer.domElement.remove()
  }
})
</script>

<template>
  <div
    ref="canvasContainer"
    class="globe-3d-viewport relative w-full h-full min-h-[580px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-3xl border"
    :style="{
      backgroundColor: 'var(--surface-strong)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--glass-shadow-hover)',
    }"
    @mousedown="onPointerDown"
    @mousemove="onPointerMove"
    @mouseup="onPointerUp"
    @touchstart="onPointerDown"
    @touchmove="onPointerMove"
    @touchend="onPointerUp"
    @wheel="onWheel"
  >
    <!-- 背景战术星空与全息经纬度角标 -->
    <div class="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,var(--accent)_1px,transparent_1px)] bg-[size:48px_48px]" />

    <!-- 顶部左侧：战术遥测 HUD 参数指示板 -->
    <div
      class="absolute top-4 left-4 z-20 flex flex-col gap-1 p-3 rounded-2xl border backdrop-blur-xl pointer-events-none select-none text-[11px] font-numeric"
      :style="{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--glass-shadow)',
        color: 'var(--text-secondary)',
      }"
    >
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[var(--status-positive)] animate-pulse" />
        <strong class="font-bold text-[var(--text-primary)] tracking-wide uppercase text-xs">
          3D DEFENSE ORDNANCE GEOATLAS
        </strong>
      </div>

      <div class="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1 border-t pt-1.5 border-[var(--border)]">
        <span>坐标: <strong class="text-[var(--text-primary)]">{{ telemetry.lat }}, {{ telemetry.lng }}</strong></span>
        <span>视高: <strong class="text-[var(--text-primary)]">{{ telemetry.altitude }}</strong></span>
        <span>目标: <strong class="text-[var(--accent)] truncate max-w-[120px]">{{ telemetry.targetName }}</strong></span>
        <span>状态: <strong class="text-[var(--status-positive)]">60 FPS 遥测就绪</strong></span>
      </div>
    </div>

    <!-- 顶部右侧：操作手势交互微指引 -->
    <div class="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-xl bg-[var(--surface)] border-[var(--border)] text-xs font-semibold text-[var(--text-tertiary)] shadow-xs select-none pointer-events-none">
      <span>🖱️ 拖拽惯性旋转</span>
      <span>&bull;</span>
      <span>滚轮平滑缩放</span>
      <span>&bull;</span>
      <span>点击全息标牌定焦</span>
    </div>

    <!-- 底部左侧：图例 HUD -->
    <div class="absolute bottom-4 left-4 z-20 flex items-center gap-3 p-2.5 rounded-xl border backdrop-blur-xl bg-[var(--surface)] border-[var(--border)] text-xs font-medium shadow-md select-none">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-sm" />
        <span class="text-[var(--text-secondary)] font-semibold">高校标牌 (34)</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-sm" />
        <span class="text-[var(--text-secondary)] font-semibold">企业标牌 (80)</span>
      </div>
      <div v-if="showArcs" class="hidden sm:flex items-center gap-1.5 border-l pl-2.5 border-[var(--border)]">
        <span class="w-3 h-0.5 bg-[var(--accent)]" />
        <span class="text-[var(--text-secondary)] font-semibold">产学研动态光子飞线</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.globe-3d-viewport {
  touch-action: none;
}
</style>
