<script setup lang="ts">

const { data: allParties } = await useFetch<PartyData[]>('/api/parties')
const coords = ref({
	lat: 0,
	lng: 0
})
const matchParties = ref<PartyData[]>([])
const checkInInfo = useRoute().params.checkInInfo as string
const lineAvatarUrl = useRuntimeConfig().public.lineAvatarUrl
const { isMobile } = useUserState()

async function checkIn(checkInInfo: string, party: PartyData) {
	// if (party.actualAttenders.find(attender => attender.lineName === checkInName)) {
	// 	return alert('已經簽到過了')
	// }
	const checkInInfoArr = checkInInfo.split('-') // [ lineUserId, lineName, avatarUrl ]
	const checkInInfoToUpdate = {
		lineUserId: checkInInfoArr[0],
		lineName: checkInInfoArr[1],
		avatarUrl: `${lineAvatarUrl}/${checkInInfoArr[2]}`,
		checkAt: new Date()
	}


	await useFetch('/api/parties', {
		method: 'put',
		body: { partyId: party._id ,checkInInfoToUpdate }
	})
	console.log(checkInInfo)
	alert('done')
}

onMounted(() => {
	// if (!isMobile.value) {
	// 	return navigateTo('/')
	// }
	alert('detecting..')
	navigator.geolocation.getCurrentPosition(pos => {
		coords.value.lat = pos.coords.latitude
		coords.value.lng = pos.coords.longitude
	}, (err) => {
		alert(`${err.message}`)
	})
})

watch(
	() => JSON.parse(JSON.stringify({...coords.value})),
	(newVal, _oldVal) => {
		// @ts-ignore
		matchParties.value = allParties.value?.filter(party => {
			console.log(new Date(party.date).getTime())
			return useCheckDistance(newVal, party.location).matchPosition &&
				new Date(party.date).getTime() - new Date().getTime() < 30 * 24 * 1 * 60 * 60 * 1000 &&
				new Date(party.date).getTime() - new Date().getTime() > 0
		})
		matchParties.value = matchParties.value.map(party => {
			return {
				...party,
				date: useFormatDate(party.date)
			}
		})
})

</script>

<template>
	<div class="w-1/2 mx-auto">
		<div>
			<h1 class="text-center p-4">可簽到的聚會</h1>
			<div class="h-[500px] overflow-auto">
				<table class="table table-zebra table-compact w-full">
					<!-- head -->
					<thead class="hidden sm:table-row">
						<tr class="w-[100vw] block sm:table-row">
							<th>聚會名稱</th>
							<th>時間</th>
							<th>地點</th>
							<th>簽到</th>
						</tr>
					</thead>
					<tbody>
						<!-- row 1 -->
						<tr v-for="(party) in matchParties" :key="party._id">
							<td><h2 class="text-2xl font-bold">{{ party.title }}</h2></td>
							<td class="text-center sm:text-left">{{ party.date }}</td>
							<td class="text-center sm:text-left whitespace-normal break-words">{{ party.address }}</td>
							<td>
								<button @click="checkIn(checkInInfo, party)" class="btn">簽到</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>