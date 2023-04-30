<script lang="ts" setup>

const picked = ref('')
const emit = defineEmits(['partyDate'])

watch(picked, (newVal) => {
	emit('partyDate', newVal)
})

defineExpose({ picked })
</script>

<template>
	<div class="w-[200px]">
		<vue-date-picker 
		v-model="picked"
		:min-date="new Date()"
		input-class-name="dp-custom-input">
	</vue-date-picker>
	</div>
</template>

<style lang="scss">
.dp-custom-input {
	border-color: rgb(96,165,250);
  color: #1976d2;

  &:hover {
    border-color: #1976d2;
  }

	background-color: #3b3b3b;
	outline: none;
}
</style>
