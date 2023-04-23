<script setup lang="ts">
const showExpected = ref(true)
const partyId = useRoute().params.partyId

const { data: party } = await useFetch<PartyData>(`/api/parties/${partyId}`)

if (!party.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Fail to get party data'
	})
}

party.value = {
	...party.value,
	date: useCovertDate(party.value.date),
	actualAttenders: party.value.actualAttenders.map(attender => {
		return {
			...attender,
			checkAt: useCovertDate(attender.checkAt)
		}
	})
}


</script>

<template>
	<div class="p-4 flex flex-col items-center space-y-4">
		<div class="space-y-1 text-center">
			<h1>{{ party?.title }}</h1>
			<p>{{ party?.address }}</p>
			<p>{{ party?.date }}</p>
		</div>

		<div class="border border-red-500">
			<AttenderList 
				v-if="party"
				:expected-attenders="party.expectedAttenders" 
				:actual-attenders="party.actualAttenders"
				:party-date="party.date"
			/>
		</div>
	</div>
</template>