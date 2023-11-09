<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const userStore = useUserStore()

const logout = () => {
  localStorage.removeItem('token')
  userStore.clear()

  router.push({
    name: 'home'
  })
}
</script>

<template>
  <header class="p-6 bg-white shadow-md flex justify-center">
    <nav class="flex items-center justify-between max-w-5xl w-full">
      <div>
        Hello <span v-if="userStore.user" class="capitalize">{{ userStore.user.name }}</span><span v-else>Guest</span>
      </div>

      <ul class="flex justify-end text-lg">
        <li class="hover:text-blue-500 cursor-pointer px-4">
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="!userStore.user" class="hover:text-blue-500 cursor-pointer px-4">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!userStore.user" class="hover:text-blue-500 cursor-pointer px-4">
          <router-link to="/register">Register</router-link>
        </li>
        <li v-else class="hover:text-blue-500 cursor-pointer px-4" @click="logout">
          Logout
        </li>
      </ul>
    </nav>
  </header>

  <main>
    <slot></slot>
  </main>
</template>