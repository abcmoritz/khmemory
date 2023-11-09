<script setup>
const props = defineProps({
  error: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div v-if="error" class="rounded-md bg-rose-600 p-4 text-white">
    {{ props.error }}
  </div>
</template>