<script lang="ts" setup>
const isOpened = ref(false)
const attenderCount = ref(1)
const attenders = reactive<string[]>([])
const emit = defineEmits(['attenders'])

const modal = ref<HTMLDialogElement>()


const open = () => {
	// isOpened.value = !isOpened.value
	modal.value?.showModal()
}
const addAttender = () => {
	attenderCount.value++
}

function removeAttender(targetIndex: number) {
	attenders.splice(targetIndex, 1)
	attenderCount.value--
}

function focusNext() {
	alert('hi')
}

watch(attenders, (newVal) => {
	emit('attenders', newVal)
})

</script>

<template>
	<div>
		<div class="flex space-x-3 items-center bg-blue-600 hover:bg-blue-800 p-3 duration-200 text-white rounded-xl cursor-pointer" @click="open">
			<IconEdit/>
	
			<span>編輯預計出席名單 (選擇性)</span>
		</div>

		<dialog ref="modal" class="rounded-xl">
			<div class="w-full sm:w-[240px] h-[350px] mt-3 overflow-x-hidden flex flex-col space-y-3 items-center justify-start">
				<div class="flex items-center space-x-2 mx-5" v-for="n in attenderCount" :key="n">
					<input class="p-2" type="text" placeholder="輸入參加者LINE名稱"
						v-model.lazy="attenders[n-1]"
						@keyup.enter="focusNext"
					>
					<span class="cursor-pointer" @click="removeAttender(n-1)">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#9c3030" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 1 1 .708-.708z"/></svg>
					</span>
				</div>
			</div>
			<div class="space-x-3">
				<button type="button" class="btn bg-orange-400 hover:bg-orange-600" @click.prevent="addAttender">新增參加者</button>
				<button type="button" class="btn bg-orange-400 hover:bg-orange-600" @click.prevent="modal?.close()">確認並關閉</button>
			</div>
		</dialog>

		<!-- <div class="absolute sm:bottom-60 border border-black bg-slate-900 flex flex-col items-center space-y-6 rounded-xl p-2" v-if="isOpened">
			<div class="w-full sm:w-[240px] h-[350px] mt-3 overflow-x-hidden flex flex-col space-y-3 items-center justify-start">
				<div class="flex items-center space-x-2 mx-5" v-for="n in attenderCount" :key="n">
					<input class="p-2" type="text" placeholder="輸入參加者LINE名稱" v-model.lazy="attenders[n-1]">
					<span class="cursor-pointer" @click="removeAttender(n-1)">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#9c3030" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 1 1 .708-.708z"/></svg>
					</span>
				</div>
			</div>
			<div class="space-x-3">
				<button class="btn bg-orange-400 hover:bg-orange-600" @click.prevent="addAttender">新增參加者</button>
				<button class="btn bg-orange-400 hover:bg-orange-600" @click.prevent="isOpened = !isOpened">確認並關閉</button>
			</div>
		</div> -->
	</div>
</template>