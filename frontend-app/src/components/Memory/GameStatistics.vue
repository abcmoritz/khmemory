<script setup>
import StatisticsBox from "@/components/Memory/StatisticsBox.vue";
import { useGameStore } from "@/stores/game";
const gameStore = useGameStore()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <StatisticsBox>
      <template #title>
        Turns
      </template>

      <template #content>
        {{ gameStore.turns }}
      </template>
    </StatisticsBox>

    <StatisticsBox>
      <template #title>
        Pairs found
      </template>

      <template #content>
        {{ gameStore.matchingPairs }} / {{ gameStore.cards?.value?.length / 2 }}
      </template>
    </StatisticsBox>
  </div>
</template>