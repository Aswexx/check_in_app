<script lang="ts" setup>
const { toast } = useToast()

watch(
	() => toast.value.activate,
	(newVal) => {
		if (newVal) {
			setTimeout(() => {
				toast.value.activate = false
			}, 2000)
		}
	}
)


</script>

<template>
	<div v-if="toast.activate" class="toast toast-top toast-end">
		<div class="alert" :class="toast.type">
			<div>
				<span class="text-white">{{ toast.content }}</span>
			</div>
		</div>
	</div>
</template>