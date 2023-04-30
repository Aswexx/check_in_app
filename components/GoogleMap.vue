<script lang="ts" setup>
import { Loader } from '@googlemaps/js-api-loader'
const config = useRuntimeConfig()
const loader = new Loader({ apiKey: config.googleApiKey })
const selectedPos = ref({
	lat: 0,
	lng: 0
})
const address = ref('')
const emit = defineEmits(['partyLocation'])

const addressInput = ref<HTMLInputElement>()
const mapDiv = ref<HTMLElement | null>(null)
const marker = ref<google.maps.Marker | null>(null)
let map = ref<google.maps.Map | null>(null)

let markerListener: any = null
const { triggerToast } = useToast()

function geocode() {
	const geocoder = new google.maps.Geocoder()
	geocoder.geocode({ address: address.value }, (results, status) => {
		if (status === google.maps.GeocoderStatus.OK) {
			const location = results![0].geometry.location
			marker.value?.setPosition(location)
			selectedPos.value.lat = location.lat()
			selectedPos.value.lng = location.lng()
			map.value?.setCenter(location)
		} else {
			triggerToast('alert-error','輸入的地址不正確')
			addressInput.value?.select()
		}
	})
}


async function geocodeAddress() {
	const geocoder = new google.maps.Geocoder()
	await geocoder.geocode({ location: selectedPos.value }, (results, status) => {
		if (status === google.maps.GeocoderStatus.OK) {
			
			const formattedAddress = results![0].formatted_address
			address.value = formattedAddress
		}
	})
}

watch(selectedPos.value, async () => {
	await geocodeAddress()
	emit('partyLocation', {
		location: selectedPos.value,
		address: address.value
	})
})

onMounted(async () => {
	try {
		await loader.load()
		await new Promise<boolean>((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					selectedPos.value.lat = pos.coords.latitude
					selectedPos.value.lng = pos.coords.longitude
					resolve(true)
				},
				(error) => {
					alert(`${error.message}`)
					reject(error.message)
				}
				)
			})
			map.value = new google.maps.Map(mapDiv.value as HTMLElement, {
				center: selectedPos.value,
				zoom: 16
			})
		
			marker.value = new google.maps.Marker({
				position: selectedPos.value,
				map: map.value,
				draggable: true
			})
		
			
			markerListener = google.maps.event.addListener(marker.value!, 'dragend', () => {
			selectedPos.value.lat = marker.value!.getPosition()!.lat()
			selectedPos.value.lng = marker.value!.getPosition()!.lng()
		})
	} catch (error) {
		alert(error)
	}
})


onUnmounted(() => {
	if (markerListener) markerListener.remove()
})

</script>

<template>
  <div class="w-3/4 flex flex-col items-center space-y-3">
    <div class="w-3/4">
      <input ref="addressInput" class="custom w-full" @change="geocode" v-model.lazy="address" type="text" placeholder="請輸入聚會地址" />
    </div>
    <div class="w-full h-96" ref="mapDiv"></div>
  </div>
</template>