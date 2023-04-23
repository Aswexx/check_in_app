<script setup lang="ts">
const props = defineProps<{ perPageCount: number, partiesCount: number }>()
const emits = defineEmits(['currentPage'])

const currentPage = ref(1)

const buttonCount = computed(() => {
	if (!(props.partiesCount % props.perPageCount)) {
		return props.partiesCount / props.perPageCount
	}

	return Math.ceil(props.partiesCount / props.perPageCount)
})

function changePage(targetPage: number) {
	currentPage.value = targetPage
	emits('currentPage', currentPage.value)
}
</script>

<template>
	<div class="btn-group">
		<button class="btn btn-xs"
			:class="{'btn-disabled': currentPage === 1}"
			@click="changePage(currentPage-1)"
		>&laquo; PRE</button>
		<button class="btn btn-xs" 
			:class="{'btn-active': currentPage === n}"
			v-for="n in buttonCount" :key="n"
			@click="changePage(n)"
			>{{ n }}</button>
		<button class="btn btn-xs"
			:class="{'btn-disabled': currentPage === buttonCount}"
			@click="changePage(currentPage+1)"
		>NEXT &raquo;</button>
	</div>
</template>