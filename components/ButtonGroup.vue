<script setup lang="ts">
const { label, options } = defineProps<{ label: string, options: string[] }>()
const emits = defineEmits(['userSelect'])

const userSelectIndex = ref(NaN)

function handleUserSelect(index: number) {
  userSelectIndex.value = index
  emits('userSelect', userSelectIndex.value, label)
}

</script>

<template>
  <div class="py-1">
    <label class="block py-4">{{ label }}</label>
    <div>
      <div class="btn btn-outline" 
        v-for="option, index in options" :key="option"
        @click="handleUserSelect(index)"
      >
      {{ option }}
      </div>
    </div>
  </div>
</template>