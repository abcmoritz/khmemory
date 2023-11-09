<script setup>
const props = defineProps({
  for: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <label class="block" :for="props.for">
    <slot></slot>
  </label>
</template>