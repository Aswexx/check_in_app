<script setup lang="ts">

const initPartyInfo = {
	title: '',
	date: new Date(0),
	earliestCheckable: Infinity,
	latestCheckable: Infinity,
	address: '',
	location: '',
	expectedAttenders: ['']
}
const partyInfo = reactive({
	...initPartyInfo
})

const earliestOptions = ['半小時前', '1小時前', '2小時前', '不限']
const latestOptions = ['半小時內', '1小時內', '2小時內', '不限']

const modal = ref<HTMLDialogElement>()
const { triggerToast } = useToast()

function handleUserSelect(selectIndex: number, label: string) {
	const hourMileseconds = 60 * 60 * 1000
	const timeRangeOptions = [0.5 * hourMileseconds, hourMileseconds, 2 * hourMileseconds, Infinity]

	if (label === '最早可簽到') {
		partyInfo.earliestCheckable = timeRangeOptions[selectIndex]
	} else {
		partyInfo.latestCheckable = timeRangeOptions[selectIndex]
	}
}


function handleDate(date: Date) {
	partyInfo.date = date
}

function handlePartyLocation(locationInfo: any) {
	const { address, location } = locationInfo
	partyInfo.address = address
	partyInfo.location = location
}

function handleAttenders(attenders: string[]) {
	partyInfo.expectedAttenders = attenders
}

const titleInput = ref<HTMLInputElement>()
function handleSubmit() {
	// validation
	if (!partyInfo.title || partyInfo.title.length > 20) {
		triggerToast('alert-error','聚會名稱不能為空或超過20個字')
		return titleInput.value?.select()
	}

	if (partyInfo.date < new Date()) {
		return triggerToast('alert-error','請選擇聚會日期')
	}

	modal.value?.showModal()
}

const datePicker = ref<any>(null)
function reset() {
	Object.assign(partyInfo, initPartyInfo)
	datePicker.value.picked = ''
}

async function createNewParty() {
	modal.value?.close()
	// await useFetch('/api/parties', {
	// 	method: 'post',
	// 	body: partyInfo
	// })
	// window.location.reload()

	// toast	
	triggerToast('alert-success','聚會已建立')
	reset()
}

// TODO: 蒐集允許簽到時間區間，讓實際簽到時有直接依據可以不顯示可簽到的聚會。

</script>

<template>
	<div class="w-full h-[100dvh] overflow-y-auto">
		<form action="/" @submit.prevent="handleSubmit" class="
		h-full relative flex flex-col items-center pt-2 space-y-2 text-center
		sm:space-y-0 sm:justify-between sm:py-6 overflow-y-auto">

			<div class="py-1 space-y-2">
				<label class="block" for="name">聚會名稱</label>
				<input class="custom" type="text" id="name" ref="titleInput" v-model.trim="partyInfo.title">
			</div>
			

			<div class="py-1 space-y-2">
				<label>聚會時間</label>
				<DatePicker @partyDate="handleDate" ref="datePicker"/>
			</div>

			<ButtonGroup
				:label="'最早可簽到'"
				:options="earliestOptions"
				@user-select="handleUserSelect"
			/>

			<ButtonGroup
				:label="'最晚可簽到'"
				:options="latestOptions"
				@user-select="handleUserSelect"
			/>

			<div class="w-full space-y-2 flex flex-col justify-center items-center py-1">
				<label class="block py-4">聚會地址</label>
				<GoogleMap @partyLocation="handlePartyLocation"/>
				<ExpectedList @attenders="handleAttenders"/>
			</div>
			<button class="btn bg-primary hover:bg-primary-200">登錄聚會</button>
		</form>

		<dialog ref="modal" class="text-center space-y-3">
			<h1>確認聚會資訊</h1>
			<h2 class="text-2xl">{{ partyInfo.title }}</h2>
			<p>{{ partyInfo.date }}</p>
			<p>{{ partyInfo.address }}</p>
			<div>
				<div class="flex items-center justify-center space-x-2 border-b">
					<IconList/>
					<h3>預計出席</h3>
				</div>
				<ul class="max-h-[150px] overflow-auto">
					<li v-for="attender in partyInfo.expectedAttenders" :key="attender">{{ attender }}</li>
				</ul>
			</div>
			<div class="space-x-6">
				<button @click="createNewParty" class="btn btn-primary">確認</button>
				<button @click="modal?.close()" class="btn">取消</button>
			</div>
		</dialog>

	</div>
</template>