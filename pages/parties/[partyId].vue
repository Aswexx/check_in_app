<script setup lang="ts">
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
	date: useFormatDate(party.value.date),
}

</script>

<template>
	<div class="p-4 flex flex-col items-center space-y-4">
		<div class="w-3/4 p-4 space-y-1 text-center border-b">
			<h1>{{ party?.title }}</h1>
			<p>{{ party?.address }}</p>
			<p>{{ party?.date }}</p>
		</div>

		<div>
			<AttenderList 
				v-if="party"
				:expected-attenders="party.expectedAttenders" 
				:actual-attenders="party.actualAttenders"
				:party-date="party.date"
			/>
		</div>
	</div>
</template>