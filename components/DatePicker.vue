<script lang="ts" setup>
const picked = ref('')
const emit = defineEmits(['partyDate'])

watch(picked, (newVal) => {
	emit('partyDate', newVal)
})
</script>

<template>
	<div class="w-[200px]">
		<vue-date-picker v-model="picked" input-class-name="dp-custom-input"></vue-date-picker>
	</div>
</template>

<style lang="scss">
.dp-custom-input {
	box-shadow: 0 0 6px #1976d2;
  color: #1976d2;

  &:hover {
    border-color: #1976d2;
  }
}
</style>
