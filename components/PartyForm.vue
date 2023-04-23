<script setup lang="ts">
const partyInfo = reactive({
	title: '',
	date: new Date(),
	address: '',
	location: '',
	expectedAttenders: ['']
})

const modal = ref<HTMLDialogElement>()

function handleDate(date: Date) {
	console.log('收到', date)
	partyInfo.date = date
}

function handlePartyLocation(locationInfo: any) {
	console.log('收到', locationInfo)
	const { address, location } = locationInfo
	partyInfo.address = address
	partyInfo.location = location
}

function handleAttenders(attenders: string[]) {
	console.log('收到', attenders)
	partyInfo.expectedAttenders = attenders
}


function handleSubmit() {
	const { title, date, address, location, expectedAttenders } = partyInfo
	console.log(partyInfo)
	modal.value?.showModal()
}

async function createNewParty() {
	alert('已送出!')
	modal.value?.close()
	await useFetch('/api/parties', {
		method: 'post',
		body: partyInfo
	})
	window.location.reload()
}

</script>

<template>
	<div class="w-full">
		<form action="/" @submit.prevent="handleSubmit" class="h-full relative border border-black flex flex-col items-center space-y-2 overflow-y-auto">
			<h1>登錄聚會</h1>
			<label for="name">聚會名稱</label>
			<input class="custom" type="text" id="name" v-model="partyInfo.title">
			<label>聚會時間</label>
			<DatePicker @partyDate="handleDate"/>
			<label>選擇聚會地址</label>
			<GoogleMap @partyLocation="handlePartyLocation"/>
			<AttendList @attenders="handleAttenders"/>
			<button class="btn bg-blue-600 hover:bg-blue-800">登錄聚會</button>
		</form>

		<dialog ref="modal">
			<h1>確認聚會資訊</h1>
			<p>聚會名稱: {{ partyInfo.title }}</p>
			<p>聚會時間: {{ partyInfo.date }}</p>
			<p>聚會地址: {{ partyInfo.address }}</p>
			<p>預計出席: {{ partyInfo.expectedAttenders }}</p>
			<button @click="createNewParty">確認</button>
			<button @click="modal?.close()">取消</button>
		</dialog>
	</div>
</template>