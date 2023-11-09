<script setup>
import InputLabel from "@/components/Form/InputLabel.vue";
import TextInput from "@/components/Form/TextInput.vue";
import { onMounted, reactive, ref } from "vue";
import PrimaryButton from "@/components/Form/PrimaryButton.vue";
import http from "@/helpers/http";
import router from "@/router";
import ErrorBox from "@/components/ErrorBox.vue";

const form = reactive({
  email: null,
  password: null
})

const errors = reactive({})
const loading = ref(false)

onMounted(() => {
  if(localStorage.getItem('token')) router.push({
    name: 'home'
  })
})

const submit = () => {
  loading.value = true
  http().post('/api/login', form)
    .then((response) => {
      if(response.data.token) {
        localStorage.setItem('token', response.data.token)
      }

      router.push({
        name: 'home'
      })
    })
    .catch((error) => {
      errors.value = error.response.data.message
    })
    .finally(() => loading.value = false)
}
</script>

<template>
  <div class="flex min-h-screen w-screen items-center justify-center">
    <div class="flex w-full max-w-md flex-col gap-4 rounded-md border border-slate-200 p-4">
      <div class="font-semibold">
        Login
      </div>

      <form @submit.prevent="submit" class="flex flex-col gap-4">
        <div class="block">
          <InputLabel for="email">E-Mail</InputLabel>
          <TextInput v-model="form.email" type="email" placeholder="E-Mail" autocomplete="email" required></TextInput>
        </div>

        <div class="block">
          <InputLabel for="email">Password</InputLabel>
          <TextInput v-model="form.password" type="password" placeholder="Password" autocomplete="password" required></TextInput>
        </div>

        <ErrorBox v-if="errors" :error="errors.value">
        </ErrorBox>

        <div class="border-b border-slate-100"></div>

        <div class="flex items-center justify-between">
          <RouterLink to="/register">Register</RouterLink>

          <PrimaryButton :loading="loading" type="submit">
            Login
          </PrimaryButton>
        </div>
      </form>

    </div>
  </div>
</template>