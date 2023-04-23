<script lang="ts" setup>
// created
// TODO: fix: map 完 expired 功能受影響
const { data: parties, error } = await useFetch<PartyData[]>('/api/parties')

const mappedParties = parties.value?.map(party => {
	return {
		...party,
		date: useCovertDate(party.date).toLocaleDateString('zh-TW',{
			timeZone: 'Asia/Taipei',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			weekday: 'short'
		})
	}
})

</script>

<template>
	<div v-if="mappedParties">
		<PartyList :parties="mappedParties" :user-controls="true"/>
	</div>
</template>