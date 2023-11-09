import { defineStore } from "pinia";
import {  ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const updateUser = data => {
    user.value = data
  }

  const clear = () => {
    user.value = null
  }

  return {user, updateUser, clear }
})