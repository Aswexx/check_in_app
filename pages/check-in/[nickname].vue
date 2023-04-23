<script setup lang="ts">

const { data: allParties } = await useFetch<PartyData[]>('/api/parties')
const coords = ref({
	lat: 0,
	lng: 0
})
const matchParties = ref<PartyData[]>([])
const checkInName = useRoute().params.nickname as string

async function checkIn(checkInName: string, party: PartyData) {
	alert(checkInName)
	if (party.actualAttenders.find(attender => attender.lineName === checkInName)) {
		return alert('已經簽到過了')
	}


	await useFetch('/api/parties', {
		method: 'put',
		body: { partyId: party._id ,checkInName }
	})
}

onMounted(() => {
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
		matchParties.value = allParties.value?.filter(party => useCheckDistance(newVal, party.location).matchPosition)
})

</script>

<template>
	<div class="w-1/2 mx-auto">
		<h1 class="text-red-300">{{ coords }}</h1>
		<div>
			<h2>可簽到的聚會</h2>
			<div class="h-[500px] overflow-auto">
				<table class="table table-zebra table-compact w-full">
					<!-- head -->
					<thead>
						<tr>
							<th>聚會名稱</th>
							<th>時間</th>
							<th>地點</th>
							<th>簽到</th>
						</tr>
					</thead>
					<tbody>
						<!-- row 1 -->
						<tr v-for="(party) in matchParties" :key="party._id">
							<td>{{ party.title }}</td>
							<td class="text-left">{{ party.date }}</td>
							<td class="text-left whitespace-normal break-words">{{ party.address }}</td>
							<td @click="checkIn(checkInName, party)" class="cursor-pointer">簽到</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>