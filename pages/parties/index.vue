<script lang="ts" setup>
const { data: parties, error } = await useFetch<PartyData[]>('/api/parties')

</script>

<template>
	<div v-if="parties">
		<PartyList :parties="parties" :user-controls="true"/>
	</div>
</template>