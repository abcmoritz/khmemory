<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import { useGameStore } from "@/stores/game";
import { computed, onMounted, ref, watch } from "vue";
import DialogModal from "@/components/Modal/DialogModal.vue";
import PrimaryButton from "@/components/Form/PrimaryButton.vue";
import Game from "@/components/Memory/Game.vue";
import { useUserStore } from "@/stores/user";
const gameStore = useGameStore()
const userStore = useUserStore()

const showCongrats = ref(false)
const gameId = ref(null)

const remainingPairsWatched = computed(() => {
  return gameStore.remainingPairs
})

onMounted(() => {
  gameId.value = generateGameId()
})

watch(remainingPairsWatched, (remainingPairs) => {
  if(remainingPairs < 1) {
    showCongrats.value = true
  }
})

const generateGameId = () => {
  return Math.floor(Math.random() * 900000) + 100000
}

const restartGame = () => {
  gameStore.reset()
  gameId.value = generateGameId()
  showCongrats.value = false
}
</script>

<template>
  <AppLayout>
    <div v-if="userStore.user">
      <Game v-if="gameId"
            :key="gameId"
      ></Game>
    </div>
    <div v-else class="flex w-full items-center justify-center p-10">
      <router-link to="/login">
        Please login
      </router-link>
    </div>


    <DialogModal :show="showCongrats" :closeable="true" @close="showCongrats=false" >
      <template #title>
      </template>
      <template #content>
        <div class="mb-4 flex flex-col items-center gap-4">
          <h1 class="text-center text-3xl font-semibold text-black">Congratulations!</h1>
          <p class="text-center text-lg">
            You did it!
          </p>
        </div>
        <div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/Od0QRnzwRBYmDU3eEO" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p></p>
      </template>
      <template #footer>
        <PrimaryButton @click="restartGame">
          Restart game
        </PrimaryButton>
      </template>
    </DialogModal>
  </AppLayout>
</template>
