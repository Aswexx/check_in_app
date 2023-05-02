import { onMounted, onUnmounted } from 'vue'

export default async function useGeolocation() {
  const coords = ref({
    lat: 0,
    lng: 0
  })

  onMounted(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        coords.value.lat = pos.coords.latitude
        coords.value.lng = pos.coords.longitude
      },
      (err) => {
        console.log(err.message)
      }
    )
  })

  return { coords }
}