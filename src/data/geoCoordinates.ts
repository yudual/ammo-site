import { companies, type Company } from './companies'
import { universities, type University } from './universities'

export type GeoItemType = 'university' | 'company'

export interface GeoItem {
  id: string
  name: string
  type: GeoItemType
  lat: number
  lng: number
  city: string
  province: string
  relevanceLevel: '高' | '中' | '低' | '待核对'
  verificationStatus: string
  tags: string[]
  summary: string
  targetUrl: string
  tierOrOwnership?: string
}

export interface GeoArc {
  fromId: string
  toId: string
  fromName: string
  toName: string
  fromCoords: [number, number] // [lng, lat]
  toCoords: [number, number] // [lng, lat]
  label: string
  color?: string
}

export interface GeoRegionCluster {
  id: string
  name: string
  center: [number, number] // [lng, lat]
  zoom3D: number
  zoom2D: number
  description: string
}

// 核心军工与工业城市基准经纬度字典 [经度 lng, 纬度 lat]
export const cityCoordinatesMap: Record<string, [number, number]> = {
  北京: [116.4074, 39.9042],
  北京市: [116.4074, 39.9042],
  西安: [108.9398, 34.3416],
  西安市: [108.9398, 34.3416],
  宝鸡: [107.1448, 34.3693],
  宝鸡市: [107.1448, 34.3693],
  华阴: [110.0888, 34.5678],
  太原: [112.5489, 37.8706],
  太原市: [112.5489, 37.8706],
  长治: [113.1163, 36.1954],
  长治市: [113.1163, 36.1954],
  忻州: [112.7342, 38.4167],
  南京: [118.7969, 32.0603],
  南京市: [118.7969, 32.0603],
  苏州: [120.5853, 31.299],
  苏州市: [120.5853, 31.299],
  无锡: [120.3119, 31.4912],
  徐州: [117.1848, 34.2618],
  徐州市: [117.1848, 34.2618],
  常州: [119.974, 31.8112],
  合肥: [117.2272, 31.8206],
  合肥市: [117.2272, 31.8206],
  淮南: [117.0183, 32.6475],
  淮北: [116.7983, 33.9558],
  淮北市: [116.7983, 33.9558],
  马鞍山: [118.5079, 31.6894],
  马鞍山市: [118.5079, 31.6894],
  滁州: [118.3162, 32.3036],
  沈阳: [123.4315, 41.8057],
  沈阳市: [123.4315, 41.8057],
  大连: [121.6147, 38.914],
  大连市: [121.6147, 38.914],
  抚顺: [123.9572, 41.8808],
  鞍山: [122.9946, 41.1086],
  鞍山市: [122.9946, 41.1086],
  阜新: [121.6489, 42.0118],
  长春: [125.3235, 43.8171],
  吉林: [126.5494, 43.8378],
  哈尔滨: [126.535, 45.8038],
  双鸭山: [131.1594, 46.6468],
  双鸭山市: [131.1594, 46.6468],
  绵阳: [104.7417, 31.464],
  绵阳市: [104.7417, 31.464],
  成都: [104.0665, 30.5723],
  泸州: [105.4433, 28.8891],
  雅安: [103.0423, 29.9804],
  南充: [106.0829, 30.7952],
  达州: [107.5023, 31.2095],
  重庆: [106.5516, 29.563],
  重庆市: [106.5516, 29.563],
  贵阳: [106.7092, 26.6299],
  昆明: [102.8329, 24.8801],
  曲靖: [103.7962, 25.49],
  曲靖市: [103.7962, 25.49],
  武汉: [114.3055, 30.5928],
  荆门: [112.2043, 31.0354],
  长沙: [112.9388, 28.2282],
  长沙市: [112.9388, 28.2282],
  南昌: [115.8579, 28.6829],
  郑州: [113.6254, 34.7466],
  洛阳: [112.454, 34.6197],
  焦作: [113.2418, 35.2159],
  南阳: [112.5283, 32.9908],
  荥阳: [113.3831, 34.7876],
  济南: [117.1205, 36.6512],
  青岛: [120.3826, 36.0671],
  淄博: [118.0591, 36.8047],
  临沂: [118.3564, 35.1047],
  招远: [120.4024, 37.3629],
  招远市: [120.4024, 37.3629],
  泰安: [117.0876, 36.2002],
  杭州: [120.1551, 30.2741],
  嘉兴: [120.7555, 30.7461],
  嘉兴市: [120.7555, 30.7461],
  丽水: [119.9228, 28.4677],
  福州: [119.2965, 26.0745],
  福州市: [119.2965, 26.0745],
  永安: [117.3653, 25.9416],
  永安市: [117.3653, 25.9416],
  广州: [113.2644, 23.1291],
  深圳: [114.0579, 22.5431],
  东莞: [113.7518, 23.0207],
  惠州: [114.4162, 23.1118],
  梅州: [116.1174, 24.2991],
  兴宁: [115.7314, 24.1396],
  兴宁市: [115.7314, 24.1396],
  海东: [102.1033, 36.5029],
  海东市: [102.1033, 36.5029],
  石嘴山: [106.3762, 39.0133],
  石嘴山市: [106.3762, 39.0133],
  白银: [104.1379, 36.5457],
  拉萨: [91.1409, 29.6456],
  拉萨市: [91.1409, 29.6456],
  乌鲁木齐: [87.6168, 43.8256],
  乌鲁木齐市: [87.6168, 43.8256],
  鄂尔多斯: [109.7813, 39.6083],
  石家庄: [114.5149, 38.0428],
  邢台: [114.5048, 37.0706],
  新乐: [114.6897, 38.3444],
  新乐市: [114.6897, 38.3444],
  廊坊: [116.6838, 39.538],
  上海: [121.4737, 31.2304],
  上海市: [121.4737, 31.2304],
}

// 高校所在地智能匹配字典（部分名称未显式标明城市时）
const universityCityMap: Record<string, string> = {
  bit: '北京',
  njust: '南京',
  nuc: '太原',
  sylu: '沈阳',
  xatu: '西安',
  aust: '淮南',
  hrbeu: '哈尔滨',
  nwpu: '西安',
  swust: '绵阳',
  cumt: '徐州',
  'cumt-bj': '北京',
  lntu: '阜新',
  hpu: '焦作',
  sdust: '青岛',
  tyut: '太原',
  kust: '昆明',
  sie: '沈阳',
  cust: '长春',
  buaa: '北京',
  nuaa: '南京',
  cczu: '常州',
  cqust: '重庆',
  sau: '沈阳',
  ema: '廊坊',
  xust: '西安',
  qust: '青岛',
  syuct: '沈阳',
  upc: '青岛',
  bipt: '北京',
  njtech: '南京',
  nudt: '长沙',
  nue: '武汉',
  ustc: '合肥',
  ustb: '北京',
}

// 辅助函数：根据城市名生成微散列微小偏移（避免多所同城大学/企业完全重合）
function getJitteredCoord(cityName: string, id: string): [number, number] {
  const base = cityCoordinatesMap[cityName] || [116.4, 39.9]
  // 稳定伪随机哈希，保证同一单位每次都在相同位置
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  const angle = ((Math.abs(hash) % 360) * Math.PI) / 180
  const radius = ((Math.abs(hash) % 15) / 100) * 0.45 // 约 5-20km 范围内分散
  
  const lng = Number((base[0] + Math.cos(angle) * radius).toFixed(4))
  const lat = Number((base[1] + Math.sin(angle) * radius).toFixed(4))
  return [lng, lat]
}

// 获取全站地理实体列表
export function getGeoItems(): GeoItem[] {
  const items: GeoItem[] = []

  // 1. 高校 (34所)
  universities.forEach((u: University) => {
    const city = universityCityMap[u.id] || u.city || u.province || '北京'
    const [lng, lat] = getJitteredCoord(city, `uni-${u.id}`)
    items.push({
      id: `uni-${u.id}`,
      name: u.name,
      type: 'university',
      lat,
      lng,
      city,
      province: u.province,
      relevanceLevel: u.verification.relevanceLevel,
      verificationStatus: u.verification.status,
      tags: [u.tier, u.province, ...(u.tags || [])],
      summary: u.overview || `${u.province} · ${u.tier}重点院校`,
      targetUrl: `/universities/${u.id}`,
      tierOrOwnership: u.tier,
    })
  })

  // 2. 企业 (80家)
  companies.forEach((c: Company) => {
    const city = c.city || '西安'
    const [lng, lat] = getJitteredCoord(city, `comp-${c.id}`)
    items.push({
      id: `comp-${c.id}`,
      name: c.name,
      type: 'company',
      lat,
      lng,
      city,
      province: c.region,
      relevanceLevel: c.verification.relevanceLevel,
      verificationStatus: c.verification.status,
      tags: [c.ownership, c.city, ...(c.highlights || []).slice(0, 2)],
      summary: c.description || `${c.ownership} · ${c.scaleOrIndustry}`,
      targetUrl: `/companies/${c.id}`,
      tierOrOwnership: c.ownership,
    })
  })

  return items
}

// 重点产学研科研与人才流动飞线预设
export const ordnanceFlightArcs: GeoArc[] = [
  // 北理工 -> 西安兵工203所/太原晋西工业/辽沈工业
  {
    fromId: 'uni-bit',
    toId: 'comp-1',
    fromName: '北京理工大学',
    toName: '西安现代控制技术研究所 (203所)',
    fromCoords: [116.4, 39.9],
    toCoords: [108.93, 34.34],
    label: '精确制导与弹药引信核心科研合作',
    color: '#eb7c65',
  },
  {
    fromId: 'uni-bit',
    toId: 'comp-2',
    fromName: '北京理工大学',
    toName: '晋西工业集团 (太原)',
    fromCoords: [116.4, 39.9],
    toCoords: [112.54, 37.87],
    label: '大口径火炮与新型弹药研发基地',
    color: '#eb7c65',
  },
  // 南理工 -> 华东民爆/特能集团/兵工212所
  {
    fromId: 'uni-njust',
    toId: 'comp-3',
    fromName: '南京理工大学',
    toName: '中国兵器工业第二一二研究所',
    fromCoords: [118.79, 32.06],
    toCoords: [108.93, 34.34],
    label: '火炸药与引信火工品核心输送',
    color: '#e6a75e',
  },
  {
    fromId: 'uni-njust',
    toId: 'comp-18',
    fromName: '南京理工大学',
    toName: '江南化工 (合肥/华东基地)',
    fromCoords: [118.79, 32.06],
    toCoords: [117.22, 31.82],
    label: '民爆器材与工程爆破产学研联盟',
    color: '#e6a75e',
  },
  // 中北大学 -> 晋西工业/淮海工业/辽沈工业
  {
    fromId: 'uni-nuc',
    toId: 'comp-2',
    fromName: '中北大学',
    toName: '晋西工业集团 (太原)',
    fromCoords: [112.54, 37.87],
    toCoords: [112.54, 37.87],
    label: '传统兵工第一校 · 弹药制造全链条',
    color: '#78c991',
  },
  {
    fromId: 'uni-nuc',
    toId: 'comp-11',
    fromName: '中北大学',
    toName: '淮海工业集团 (长治)',
    fromCoords: [112.54, 37.87],
    toCoords: [113.11, 36.19],
    label: '引信火工品与防空防暴弹药工程',
    color: '#78c991',
  },
  // 西工大 -> 现代控制/绵阳九院
  {
    fromId: 'uni-nwpu',
    toId: 'comp-1',
    fromName: '西北工业大学',
    toName: '西安现代控制技术研究所',
    fromCoords: [108.93, 34.34],
    toCoords: [108.93, 34.34],
    label: '空天弹药与智能攻击武器体系',
    color: '#64b5f6',
  },
  {
    fromId: 'uni-nwpu',
    toId: 'comp-5',
    fromName: '西北工业大学',
    toName: '中国工程物理研究院 (绵阳九院)',
    fromCoords: [108.93, 34.34],
    toCoords: [104.74, 31.46],
    label: '重大国防科研与含能材料物理试验',
    color: '#64b5f6',
  },
  // 沈阳理工 -> 辽沈工业
  {
    fromId: 'uni-sylu',
    toId: 'comp-65',
    fromName: '沈阳理工大学',
    toName: '辽沈工业集团 (沈阳)',
    fromCoords: [123.43, 41.8],
    toCoords: [123.43, 41.8],
    label: '东北老工业基地兵工人才直通摇篮',
    color: '#ba68c8',
  },
  // 安徽理工 -> 江南化工 / 淮北矿业爆破
  {
    fromId: 'uni-aust',
    toId: 'comp-18',
    fromName: '安徽理工大学',
    toName: '江南化工 / 安徽民爆集团',
    fromCoords: [117.01, 32.64],
    toCoords: [117.22, 31.82],
    label: '矿用炸药与工程爆破技术策源地',
    color: '#ffd54f',
  },
]

// 四大核心兵工产业与高校聚集区预设
export const geoRegionClusters: GeoRegionCluster[] = [
  {
    id: 'all',
    name: '全国全览',
    center: [108.5, 34.5],
    zoom3D: 2.2,
    zoom2D: 1,
    description: '全景呈现全国 34 所兵工类高校与 80 家企业院所空间格局',
  },
  {
    id: 'northwest',
    name: '西北科研重镇',
    center: [108.94, 34.34],
    zoom3D: 5.5,
    zoom2D: 2.5,
    description: '以陕西西安、宝鸡、银川为核心的兵器科研院所与重点高校集群',
  },
  {
    id: 'northeast',
    name: '东北老牌制造带',
    center: [123.43, 41.8],
    zoom3D: 5.0,
    zoom2D: 2.2,
    description: '辽沈工业、特种化工与重型装备研发制造老牌根据地',
  },
  {
    id: 'north',
    name: '华北弹药火炮带',
    center: [112.54, 37.87],
    zoom3D: 5.2,
    zoom2D: 2.3,
    description: '以太原、长治、包头为代表的大口径弹药与火炮引信核心基地',
  },
  {
    id: 'east_southwest',
    name: '华东/西南走廊',
    center: [112.0, 30.5],
    zoom3D: 4.2,
    zoom2D: 1.8,
    description: '涵盖长三角民爆高地与川渝尖端物理科研/特种机械聚集区',
  },
]
