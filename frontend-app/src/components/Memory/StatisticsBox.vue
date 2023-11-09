<script setup>

</script>

<template>
  <div class="w-full p-4 rounded-md border border-slate-200
flex flex-col gap-2">

    <div v-if="$slots.title" >
      <slot name="title">

      </slot>
    </div>

    <div v-if="$slots.content" class="text-xl font-bold text-blue-700">
      <slot name="content">

      </slot>
    </div>
  </div>
</template>