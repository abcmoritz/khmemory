<script setup>
import Card from "@/components/Memory/Card.vue";
import { computed, onMounted, reactive, watch } from "vue";
import { useGameStore } from "@/stores/game";
import loadImages from "@/helpers/images";
import CardFactory from "@/factories/CardFactory";

const gameStore = useGameStore()

const images = reactive([]);

const flipCard = card => {
  if(activeCards.value.length > 1) return
  if(card.visible) return
  card.visible = true
  card.selected = true
}

onMounted(() => {
  loadImages()
    .then((loadedImages) => {
      images.value = loadedImages
      loadGame()
    })
    .catch((error) => {
      console.error('Error loading images:', error);
    });
})

const loadGame = () => {
  generateCards()
}

const generateCards = () => {
  let cards = new CardFactory(images)
    .generateCardPairs(8)
    .shuffleCards()
    .getAllCards()

  gameStore.setCards(cards)
}

const activeCards = computed(() => {
  return gameStore.cards?.value?.filter(card => card.selected)
})

watch(activeCards, (newSelectedCards) => {
  if(newSelectedCards.length > 1) {
    addTurn()

    setTimeout(()=> {
      detectMatch()

      deselectCards()

      checkIfGameDone()
    }, 750)
  }
})

const detectMatch = () => {
  if(activeCards.value[0].value !== activeCards.value[1].value) {
    onIsNotMatching()
  } else {
    onIsMatching()
  }
}

const onIsMatching = () => {
  activeCards.value[0].matched = true
  activeCards.value[1].matched = true
}

const onIsNotMatching = () => {
  activeCards.value[0].visible = false
  activeCards.value[1].visible = false
}

const deselectCards = () => {
  activeCards.value[1].selected = false
  activeCards.value[0].selected = false
}

const addTurn = () => {
  gameStore.addTurn()
}

const checkIfGameDone = () => {
  return gameStore.remainingPairs <= 0;
}

const currentCards = computed(() => {
  return gameStore.cards.value
})

</script>

<template>
  <div class="grid w-full grid-cols-2 grid-rows-4 gap-4 md:grid-cols-3 lg:grid-cols-4">
    <Card v-for="(card) in currentCards"
          :card="card"
          :key="card.id"
          @flip="flipCard(card)"
    >
    </Card>
  </div>
</template>