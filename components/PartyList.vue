<script setup lang="ts">

// let parties = reactive<any[]>([])


const { parties } = defineProps<{ parties: PartyData[] | [], userControls: boolean }>()

const expiredOnly = ref(false)
const keyword = ref('')
const currentPage = ref(1)
const partiesCount = ref(0)
const PER_PAGE_COUNT = 10

const pagedParties = computed(() => {
	if (expiredOnly.value && keyword.value) {
		const expiredParties = parties.filter(party => new Date(party.date) < new Date())
		const searchedParties = expiredParties.filter(party => {
			return party.title.includes(keyword.value) || party.address.includes(keyword.value)
		})
		partiesCount.value = searchedParties.length
		return searchedParties.slice(PER_PAGE_COUNT*(currentPage.value - 1), PER_PAGE_COUNT*(currentPage.value - 1) + PER_PAGE_COUNT)
	}

	if (expiredOnly.value && !keyword.value) {
		const expiredParties = parties.filter(party => new Date(party.date) < new Date())
		partiesCount.value = expiredParties.length
		return expiredParties.slice(PER_PAGE_COUNT*(currentPage.value - 1), PER_PAGE_COUNT*(currentPage.value - 1) + PER_PAGE_COUNT)
	}

	if (!expiredOnly.value && keyword.value) {
		const searchedParties = parties.filter(party => {
			return party.title.includes(keyword.value) || party.address.includes(keyword.value)
		})
		partiesCount.value = searchedParties.length

		return searchedParties.slice(PER_PAGE_COUNT*(currentPage.value - 1), PER_PAGE_COUNT*(currentPage.value - 1) + PER_PAGE_COUNT)
	}
	partiesCount.value = parties.length
	return parties.slice(PER_PAGE_COUNT*(currentPage.value - 1), PER_PAGE_COUNT*(currentPage.value - 1) + PER_PAGE_COUNT)
})


// const partiesCount = computed(() => {
// 	return showingParties.value.length
// })

function onChangeCurrentPage(page: number) {
	currentPage.value = page
}

// created
// fix: map 完 expired 功能受影響
	// const { data } = await useFetch('/api/parties')
	// parties.push(...data.value as any[])
	// parties = parties.map(party => {
	// 	return {
	// 		...party,
	// 		date: new Date(party.date).toLocaleDateString('zh-TW', {
	// 			weekday: 'long',
	// 				year: 'numeric',
	// 				month: 'long',
	// 				day: 'numeric',
	// 				hour: 'numeric',
	// 				minute: 'numeric',
	// 				timeZone: 'Asia/Taipei'
	// 			})
	// 		}
	// 	})
//

</script>

<template>
	<div class="flex flex-col items-center space-y-5 w-full overflow-x-auto p-4">
		<div v-if="userControls" lass="w-[175px] mr-7 form-control self-end">
			<div>
				<input v-model="keyword" type="text" placeholder="搜尋名稱或地點關鍵字">
			</div>
			<label class="cursor-pointer label">
				<span class="label-text text-red-300">只顯示到期的聚會</span> 
				<input type="checkbox" class="toggle toggle-primary" v-model="expiredOnly" :checked="expiredOnly" />
			</label>
		</div>

		<table class="table table-zebra table-compact w-full">
			<!-- head -->
			<thead>
				<tr>
					<th></th>
					<th>聚會名稱</th>
					<th>時間</th>
					<th>地點</th>
					<!-- <th>預計參加人數</th> -->
					<th>查看詳細</th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				<tr v-for="(party,index) in pagedParties" :key="party._id">
					<td>{{ index + 1 }}</td>
					<td>{{ party.title }}</td>
					<td class="text-left">{{ party.date }}</td>
					<td class="text-left whitespace-normal break-words">{{ party.address }}</td>
					<!-- <td>{{ party.expectedAttenders.length }}</td> -->
					<td @click="navigateTo(`/parties/${party._id}`)" class="cursor-pointer">詳細</td>
				</tr>
			</tbody>
		</table>

		<Pagination 
			:perPageCount="PER_PAGE_COUNT" 
			:partiesCount="partiesCount"
			@currentPage="onChangeCurrentPage"
		/>
	</div>
</template>

<style>
th,td {
	text-align: center;
}

td {
	height: 60px
}
</style>