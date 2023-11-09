import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useGameStore = defineStore('game', () => {
  const turns = ref(0)
  const pairs_found = ref(0)
  const cards = reactive([])

  const addTurn = () => {
    turns.value++
  }

  const reset = () => {
    turns.value = 0
    pairs_found.value = 0
    cards.length = 0
  }

  const setCards = newCards => {
    cards.value = [...newCards]
  }

  const matchingPairs = computed(() => {
    if(cards.value) {
      return cards.value.filter(card => card.matched).length / 2
    }
    return 0
  })

  const remainingPairs = computed(() => {
    if(cards.value) {
      return cards.value.filter(card => {
        return !card.matched
      }).length / 2
    }
    return 0
  })

  return {turns, addTurn, pairs_found, cards, setCards, reset,  matchingPairs, remainingPairs}
})