<script setup>
import InputLabel from "@/components/Form/InputLabel.vue";
import PrimaryButton from "@/components/Form/PrimaryButton.vue";
import TextInput from "@/components/Form/TextInput.vue";
import { onMounted, reactive } from "vue";
import router from "@/router";
import http from "@/helpers/http";
import InputError from "@/components/Form/InputError.vue";

const form = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmation: null
})

const errors = reactive({})

onMounted(() => {
  if(localStorage.getItem('token')) router.push({
    name: 'home'
  })
})

const submit = () => {
  http().post('/api/register', form)
    .then((response) => {

      if(response.data.token) {
        localStorage.setItem('token', response.data.token)
      }

      router.push({
        name: 'home'
      })
    })
    .catch((error) => {
      errors.value = error
      console.error(error)
    })
}
</script>

<template>
  <div class="w-screen min-h-screen flex items-center justify-center">
    <form @submit.prevent="submit" class="max-w-md w-full p-4 rounded-md border border-slate-200 flex flex-col gap-4">
      <div class="font-semibold">
        Register
      </div>

      <div class="block">
        <InputLabel for="email">Name</InputLabel>
        <TextInput v-model="form.name" type="text" placeholder="Name" autocomplete="name" required></TextInput>
      </div>

      <div class="block">
        <InputLabel for="email">E-Mail</InputLabel>
        <TextInput v-model="form.email" type="email" placeholder="E-Mail" autocomplete="email" required></TextInput>
      </div>

      <div class="block">
        <InputLabel for="email">Password</InputLabel>
        <TextInput v-model="form.password" type="password" placeholder="Password123" autocomplete="password" required></TextInput>
      </div>

      <div class="mt-4">
        <InputLabel for="password_confirmation" >Confirm Password</InputLabel>
        <TextInput
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          required
          placeholder="Password123"
          autocomplete="new-password"
        />
        <InputError class="mt-2" :message="errors.password_confirmation" />
      </div>

      <div class="border-b border-slate-100"></div>

      <div class="flex items-center justify-between">
        <RouterLink to="/login">Login</RouterLink>

        <PrimaryButton type="submit">
          Register
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>