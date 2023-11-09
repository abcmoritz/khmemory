<script setup>
const props = defineProps({
  card: {
    type: Object,
    default: {
      type: 'image',
      value: 'https://picsum.photos/200/200?random=1"',
      state: 'open'
    }
  }
})

const emits = defineEmits(['flip'])
const flip = () => {
  if(props.card.selected) return
  emits("flip")
}
</script>

<template>
  <div class="aspect-square w-full block max-h-full overflow-hidden  bg-cover bg-center rounded-md
    hover:rotate-2 hover:scale-110 hover:shadow-2xl transition-all transition-800 p-0 bg-pattern relative"

       :class="[
         props.card.visible ?
          'rotate-y-180' : '',

          props.card.selected ?
            'border-4 border-rose-600 shadow-lg shadow-rose-400' : ''
       ]"

       @click="flip">

    <img v-show="props.card.visible"
         :src="props.card.display"
         width="200"
         height="200"
         class="scale-x-180 relative h-full w-full object-cover"
    >
  </div>
</template>

<style scoped>
.bg-pattern {
  background-color: #e5e5f7;
  opacity: 0.8;
  background: linear-gradient(135deg, #444cf755 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #444cf7 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #444cf755 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #444cf7 25%, #e5e5f7 25%) 0px 0/ 20px 20px;
}
</style>