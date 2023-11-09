<script setup>
import Spinner from "@/components/Spinner.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false
  }
})
</script>

<template>
  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
    <slot v-if="!props.loading"></slot>
    <Spinner v-else class="w-4 text-white"></Spinner>
  </button>
</template>