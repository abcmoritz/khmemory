import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { updateUser: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  if(!localStorage.getItem('token') && !to.meta.requiresAuth) {
    return
  }

  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    return {
      name: 'login'
    }
  }

  checkTokenAuthenticity(to.meta.requiresAuth)
})

const checkTokenAuthenticity = (requiresAuth) => {
  const userStore = useUserStore()

  axios.get('http://localhost/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((response) => {
      userStore.updateUser(response.data)
    })
    .catch(() => {
      localStorage.removeItem('token')
      userStore.clear()

      if(requiresAuth) {
        router.push({
          name: 'login'
        })
      }
    })
}

export default router
