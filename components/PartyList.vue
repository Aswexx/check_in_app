<script setup lang="ts">
const { parties } = defineProps<{ parties: PartyData[] | [], userControls: boolean }>()

const expiredOnly = ref(false)
const keyword = ref('')
const currentPage = ref(1)
const partiesCount = ref(0)
const PER_PAGE_COUNT = 10

function getExpiredDateString(parties: PartyData[]) {
	return parties
		.filter(party => new Date(party.date) < new Date())
		.map(party => {
			return {
				...party,
				date: useFormatDate(party.date)
			}
		})
}

// TODO: 手機版不切分頁，多做一個回頂部紐?
const { isMobile } = useUserState()

const partiesToShow = computed(() => {
	if (expiredOnly.value && keyword.value) {
		const expiredParties = getExpiredDateString(parties)
		const searchedParties = expiredParties.filter(party => {
			return party.title.includes(keyword.value) || party.address.includes(keyword.value)
		})
		partiesCount.value = searchedParties.length
		return isMobile.value ?
			searchedParties :
			searchedParties.slice(PER_PAGE_COUNT * (currentPage.value - 1), PER_PAGE_COUNT * (currentPage.value - 1) + PER_PAGE_COUNT)
	}

	if (expiredOnly.value && !keyword.value) {
		const expiredParties = getExpiredDateString(parties)
		partiesCount.value = expiredParties.length
		return isMobile.value ?
			expiredParties:
			expiredParties.slice(PER_PAGE_COUNT * (currentPage.value - 1), PER_PAGE_COUNT * (currentPage.value - 1) + PER_PAGE_COUNT)
	}

	if (!expiredOnly.value && keyword.value) {
		const searchedParties = parties.filter(party => {
			return party.title.includes(keyword.value) || party.address.includes(keyword.value)
		})
		partiesCount.value = searchedParties.length

		return isMobile.value ?
			searchedParties:
			searchedParties.slice(PER_PAGE_COUNT * (currentPage.value - 1), PER_PAGE_COUNT * (currentPage.value - 1) + PER_PAGE_COUNT)
	}

	partiesCount.value = parties.length
	return isMobile.value ?
		parties.map(party => {
			return {
				...party,
				date: useFormatDate(party.date)
			}
		}):
		parties
		.slice(PER_PAGE_COUNT * (currentPage.value - 1), PER_PAGE_COUNT * (currentPage.value - 1) + PER_PAGE_COUNT)
		.map(party => {
			return {
				...party,
				date: useFormatDate(party.date)
			}
		})
})

function onChangeCurrentPage(page: number) {
	currentPage.value = page
}

</script>

<template>
	<div class="flex flex-col items-center space-y-5 w-full p-4">
		<div v-if="userControls" lass="w-[175px] mr-7 form-control self-end">
			<div class="flex items-center justify-center">
				<input class="px-4 py-2" v-model="keyword" type="text" placeholder="聚會名稱或地點關鍵字">
				<IconMagnify class="-ml-6"/>
			</div>
			<label class="cursor-pointer label">
				<span class="label-text text-red-300">只顯示到期的聚會</span> 
				<input type="checkbox" class="toggle toggle-primary" 
					v-model="expiredOnly" 
					:checked="expiredOnly"
				/>
			</label>
		</div>

		<table class="table table-zebra table-compact w-full">
			<!-- head -->
			<thead>
				<tr class="hidden sm:table-row">
					<th></th>
					<th>聚會名稱</th>
					<th>時間</th>
					<th>地點</th>
					<th>查看詳細</th>
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				<tr class="w-[100vw] block sm:table-row" 
					v-for="(party,index) in partiesToShow" :key="party._id"
				>
					<td class="hidden sm:table-cell">{{ index + 1 }}</td>
					<td>{{ party.title }}</td>
					<td>{{ party.date }}</td>
					<td class="whitespace-normal break-words">{{ party.address }}</td>
					<td>
						<button @click="navigateTo(`/parties/${party._id}`)" class="btn">詳細</button>
					</td>
				</tr>

				<template v-if="partiesToShow.length < PER_PAGE_COUNT">
					<tr v-for="n in PER_PAGE_COUNT - partiesToShow.length" :key="n">
						<td></td>
						<td></td>
						<td></td>
						<td class="text-left whitespace-normal break-words"></td>
						<td></td>
					</tr>
				</template>
			</tbody>
		</table>

		<Pagination
			class="hidden sm:flex"
			:perPageCount="PER_PAGE_COUNT" 
			:partiesCount="partiesCount"
			@currentPage="onChangeCurrentPage"
		/>
	</div>
</template>