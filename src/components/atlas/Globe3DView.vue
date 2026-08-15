<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as THREE from 'three'
import type { GeoArc, GeoItem, GeoRegionCluster } from '../../data/geoCoordinates'

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
let pinsGroup: THREE.Group | null = null
let arcsGroup: THREE.Group | null = null

// 交互旋转与缩放状态
let isPointerDown = false
let previousMousePosition = { x: 0, y: 0 }
let rotationVelocity = { x: 0, y: 0.0012 } // 初始微自转
let targetRotation = { x: 0.4, y: -1.8 } // 初始聚焦中国区域
let currentZoom = 260
let targetZoom = 260

// 坐标转换：经纬度 -> 3D 球面笛卡尔坐标
function latLngToVector3(lat: number, lng: number, radius = GLOBE_RADIUS): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

// 初始化 3D 地球场景
function initThree() {
  if (!canvasContainer.value) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight || 560

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.z = currentZoom

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  globeGroup = new THREE.Group()
  scene.add(globeGroup)

  // 1. 地球核心球体
  const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64)
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  const sphereMat = new THREE.MeshPhongMaterial({
    color: isDark ? 0x141a17 : 0xeef2ef,
    emissive: isDark ? 0x090d0b : 0xd8deda,
    specular: isDark ? 0x33443a : 0xffffff,
    shininess: 12,
    transparent: true,
    opacity: 0.96,
  })
  const earthMesh = new THREE.Mesh(sphereGeo, sphereMat)
  globeGroup.add(earthMesh)

  // 2. 经纬线发光网格外壳
  const gridGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(GLOBE_RADIUS * 1.002, 32, 16))
  const gridMat = new THREE.LineBasicMaterial({
    color: isDark ? 0x384a41 : 0xb0c0b8,
    transparent: true,
    opacity: 0.28,
  })
  const gridMesh = new THREE.LineSegments(gridGeo, gridMat)
  globeGroup.add(gridMesh)

  // 3. 大气层柔和辉光外壳
  const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.06, 32, 32)
  const atmosMat = new THREE.MeshBasicMaterial({
    color: 0xeb7c65,
    transparent: true,
    opacity: 0.08,
    side: THREE.BackSide,
  })
  const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat)
  globeGroup.add(atmosMesh)

  // 4. 灯光系统
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
  scene.add(ambientLight)

  const dirLight1 = new THREE.DirectionalLight(0xffeedd, 2.0)
  dirLight1.position.set(200, 150, 300)
  scene.add(dirLight1)

  const dirLight2 = new THREE.DirectionalLight(0xeb7c65, 0.8)
  dirLight2.position.set(-200, -100, -200)
  scene.add(dirLight2)

  // 5. 挂载地标与飞线容器
  pinsGroup = new THREE.Group()
  arcsGroup = new THREE.Group()
  globeGroup.add(pinsGroup)
  globeGroup.add(arcsGroup)

  updatePins()
  updateArcs()

  // 初始旋转角度（正对中国区）
  globeGroup.rotation.x = targetRotation.x
  globeGroup.rotation.y = targetRotation.y

  animate()
}

// 创建 3D 地标发光柱与光环
function updatePins() {
  if (!pinsGroup) return
  while (pinsGroup.children.length > 0) {
    const obj = pinsGroup.children[0]
    pinsGroup.remove(obj)
  }

  props.items.forEach((item) => {
    const isUni = item.type === 'university'
    const colorHex = isUni ? 0x3b82f6 : 0xeb7c65
    const pos = latLngToVector3(item.lat, item.lng, GLOBE_RADIUS)

    // 地标发光柱
    const pillarHeight = isUni ? 8 : 6
    const pillarGeo = new THREE.CylinderGeometry(0.5, 0.2, pillarHeight, 8)
    const pillarMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.9,
    })
    const pillar = new THREE.Mesh(pillarGeo, pillarMat)

    // 定位并将光柱沿球心法线朝外旋转
    pillar.position.copy(pos.clone().multiplyScalar(1 + pillarHeight / (2 * GLOBE_RADIUS)))
    pillar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize())
    pillar.userData = { item }

    // 地面呼吸光环
    const ringGeo = new THREE.RingGeometry(0.8, 1.8, 16)
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.position.copy(pos.clone().multiplyScalar(1.003))
    ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize())

    pinsGroup?.add(pillar)
    pinsGroup?.add(ring)
  })
}

// 创建 3D 抛物线飞线 (Parabolic Arcs)
function updateArcs() {
  if (!arcsGroup) return
  while (arcsGroup.children.length > 0) {
    const obj = arcsGroup.children[0]
    arcsGroup.remove(obj)
  }

  if (!props.showArcs) return

  props.arcs.forEach((arc) => {
    const p1 = latLngToVector3(arc.fromCoords[1], arc.fromCoords[0], GLOBE_RADIUS)
    const p2 = latLngToVector3(arc.toCoords[1], arc.toCoords[0], GLOBE_RADIUS)

    // 计算弧顶中点（向外凸起）
    const mid = p1.clone().add(p2).multiplyScalar(0.5)
    const dist = p1.distanceTo(p2)
    const altitude = dist * 0.35 + 8
    mid.normalize().multiplyScalar(GLOBE_RADIUS + altitude)

    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
    const points = curve.getPoints(40)
    const arcGeo = new THREE.BufferGeometry().setFromPoints(points)
    const arcMat = new THREE.LineBasicMaterial({
      color: arc.color ? parseInt(arc.color.replace('#', '0x')) : 0xeb7c65,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    })
    const arcLine = new THREE.Line(arcGeo, arcMat)
    arcsGroup?.add(arcLine)
  })
}

// 聚焦到指定经纬度
function focusLatLng(lat: number, lng: number, zoomLevel = 220) {
  // 经纬度转换到球体所需的旋转角
  targetRotation.x = (lat - 10) * (Math.PI / 180)
  targetRotation.y = -(lng + 90) * (Math.PI / 180)
  targetZoom = zoomLevel
}

// 监听聚集区预设切换
watch(
  () => props.activeCluster,
  (cluster) => {
    if (!cluster) return
    if (cluster.id === 'all') {
      targetRotation = { x: 0.4, y: -1.8 }
      targetZoom = 260
    } else {
      focusLatLng(cluster.center[1], cluster.center[0], 210)
    }
  },
)

watch(() => props.items, updatePins, { deep: true })
watch(() => props.showArcs, updateArcs)

// 交互事件处理
function onPointerDown(e: MouseEvent | TouchEvent) {
  isPointerDown = true
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  previousMousePosition = { x: clientX, y: clientY }
}

function onPointerMove(e: MouseEvent | TouchEvent) {
  if (!isPointerDown || !globeGroup) return
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  const deltaX = clientX - previousMousePosition.x
  const deltaY = clientY - previousMousePosition.y

  targetRotation.y += deltaX * 0.005
  targetRotation.x += deltaY * 0.005
  // 限制仰角
  targetRotation.x = Math.max(-1.2, Math.min(1.2, targetRotation.x))

  previousMousePosition = { x: clientX, y: clientY }
}

function onPointerUp(e: MouseEvent | TouchEvent) {
  isPointerDown = false
  // 检查点击射线拾取
  if (!canvasContainer.value || !camera || !pinsGroup) return
  const rect = canvasContainer.value.getBoundingClientRect()
  const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX
  const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY

  const mouse = new THREE.Vector2(
    ((clientX - rect.left) / rect.width) * 2 - 1,
    -((clientY - rect.top) / rect.height) * 2 + 1,
  )

  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(pinsGroup.children)

  if (intersects.length > 0) {
    const hitObj = intersects[0].object
    if (hitObj.userData?.item) {
      emit('select', hitObj.userData.item)
      focusLatLng(hitObj.userData.item.lat, hitObj.userData.item.lng, 200)
    }
  }
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  targetZoom += e.deltaY * 0.15
  targetZoom = Math.max(140, Math.min(380, targetZoom))
}

function onResize() {
  if (!canvasContainer.value || !camera || !renderer) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight || 560
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function animate() {
  animId = requestAnimationFrame(animate)

  if (globeGroup) {
    // 缓动插值到目标旋转角度
    globeGroup.rotation.y += (targetRotation.y - globeGroup.rotation.y) * 0.08
    globeGroup.rotation.x += (targetRotation.x - globeGroup.rotation.x) * 0.08

    // 未拖拽时保持极轻微自转
    if (!isPointerDown) {
      targetRotation.y += rotationVelocity.y * 0.5
    }
  }

  if (camera) {
    currentZoom += (targetZoom - currentZoom) * 0.08
    camera.position.z = currentZoom
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

onMounted(() => {
  initThree()
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
    class="globe-3d-viewport relative w-full h-full min-h-[560px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-3xl border"
    :style="{
      backgroundColor: 'var(--surface-strong)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--glass-shadow)',
    }"
    @mousedown="onPointerDown"
    @mousemove="onPointerMove"
    @mouseup="onPointerUp"
    @touchstart="onPointerDown"
    @touchmove="onPointerMove"
    @touchend="onPointerUp"
    @wheel="onWheel"
  >
    <!-- 背景星空微发光点位 -->
    <div class="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,var(--accent)_1px,transparent_1px)] bg-[size:48px_48px]" />

    <!-- 3D 探索手势微提示 -->
    <div class="absolute top-4 left-4 z-20 flex items-center gap-2 p-2 rounded-xl border backdrop-blur-xl bg-[var(--surface)] border-[var(--border)] text-xs font-semibold text-[var(--text-tertiary)] shadow-xs select-none">
      <span>🖱️ 拖拽旋转地球</span>
      <span>&bull;</span>
      <span>滚轮缩放聚焦</span>
      <span>&bull;</span>
      <span>点击光柱查看档案</span>
    </div>

    <!-- 图例 HUD -->
    <div class="absolute bottom-4 left-4 z-20 flex items-center gap-3 p-2.5 rounded-xl border backdrop-blur-xl bg-[var(--surface)] border-[var(--border)] text-xs font-medium shadow-md">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-sm" />
        <span class="text-[var(--text-secondary)]">高校 (34)</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-sm" />
        <span class="text-[var(--text-secondary)]">企业院所 (80)</span>
      </div>
      <div v-if="showArcs" class="hidden sm:flex items-center gap-1.5 border-l pl-2.5 border-[var(--border)]">
        <span class="w-3 h-0.5 bg-[var(--accent)]" />
        <span class="text-[var(--text-secondary)]">产学研飞线</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.globe-3d-viewport {
  touch-action: none;
}
</style>
