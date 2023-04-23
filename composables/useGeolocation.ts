import { onMounted, onUnmounted } from 'vue'

export default async function useGeolocation() {
  const coords = ref({
    lat: 0,
    lng: 0
  })

  // // @ts-ignore
  // let watcher

  // onMounted(() => {
  // 	alert('detecting..')
  // 	watcher = navigator.geolocation.watchPosition(pos => {
  // 		coords.value.lantitude = pos.coords.latitude
  // 		coords.value.longitude = pos.coords.longitude
  // 	})
  // })

  // onUnmounted(() => {
  //   // @ts-ignore
  //   navigator.geolocation.clearWatch(watcher)
  // })

  // onMounted(async () => {
  //   await new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         coords.value.lat = pos.coords.latitude
  //         coords.value.lng = pos.coords.longitude
  //         resolve({success: true})
  //       },
  //       (err) => {
  //         alert(`${err.message}`)
  //       }
  //     )
  //   })
  // })

  onMounted(() => {
    alert('detecting..')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        coords.value.lat = pos.coords.latitude
        coords.value.lng = pos.coords.longitude
      },
      (err) => {
        alert(`${err.message}`)
      }
    )
  })

  return { coords }
}