<script setup>
import Board from "@/components/Memory/Board.vue";
import GameStatistics from "@/components/Memory/GameStatistics.vue";
</script>

<template>
  <div class="mx-auto flex max-w-5xl items-center justify-center px-4 py-7 lg:px-0">
    <div class="flex w-full flex-col gap-10">
      <GameStatistics></GameStatistics>
      <Board></Board>
    </div>
  </div>
</template>