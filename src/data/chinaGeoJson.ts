import chinaMapData from 'china-map-geojson'
import * as topojson from 'topojson-client'
import worldData from 'world-atlas/countries-110m.json'
import { getGeoItems, type GeoItem } from './geoCoordinates'

export interface ProvinceStat {
  id: string
  name: string
  center: [number, number] // [lng, lat]
  universities: GeoItem[]
  companies: GeoItem[]
  totalCount: number
}

// 提取中国 34 个省份的 GeoJSON Feature 数据
export const chinaGeoJson = (chinaMapData as any).ChinaData || (chinaMapData as any).default?.ChinaData || chinaMapData

// 提取全球陆地矢量几何
const worldTopo: any = worldData
export const worldCountriesGeoJson = topojson.feature(worldTopo, worldTopo.objects.countries) as any

// 统计各省份的军工实体数据分布
export function getProvinceStats(): Record<string, ProvinceStat> {
  const allItems = getGeoItems()
  const stats: Record<string, ProvinceStat> = {}

  if (chinaGeoJson && chinaGeoJson.features) {
    chinaGeoJson.features.forEach((feature: any) => {
      const name = feature.properties.name || ''
      const id = feature.properties.id || name
      const cp = feature.properties.cp || [105, 35]

      const unis = allItems.filter(
        (item) => item.type === 'university' && (item.province.includes(name) || name.includes(item.province)),
      )
      const comps = allItems.filter(
        (item) => item.type === 'company' && (item.province.includes(name) || name.includes(item.province)),
      )

      stats[name] = {
        id,
        name,
        center: cp,
        universities: unis,
        companies: comps,
        totalCount: unis.length + comps.length,
      }
    })
  }

  return stats
}
