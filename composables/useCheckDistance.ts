interface Position {
  lat: number
  lng: number
}

// Haversine 公式
export default function useCheckDistance(
  pos1: Position,
  pos2: Position
): { matchPosition: boolean } {
  const R = 6371e3 // 地球半徑，單位是米
  const φ1 = (pos1.lat * Math.PI) / 180 // 緯度 1，單位是弧度
  const φ2 = (pos2.lat * Math.PI) / 180 // 緯度 2，單位是弧度
  const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180 // 緯度差，單位是弧度
  const Δλ = ((pos2.lng - pos2.lng) * Math.PI) / 180 // 經度差，單位是弧度

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const d = R * c // 兩點間的距離，單位是米

  return { matchPosition: d <= 5000 }
}
