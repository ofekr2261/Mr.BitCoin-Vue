import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactIndex from '../views/contact-index.vue'
import ContactDetails from '../views/contact-details.vue'
import ContactEdit from '../views/contact-edit.vue'
import Stats from '../cmps/stats.vue'
import LoginSignup from '../views/login-signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactIndex,
    },
    {
      path: '/contact/:_id',
      name: 'contact-details',
      component: ContactDetails,
    },
    {
      path: '/contact/edit/:_id?',
      name: 'contact-edit',
      component: ContactEdit,
    },
    {
      path: '/signup',
      name: 'signup',
      component: LoginSignup,
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
