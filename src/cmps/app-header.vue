<template>
  <header class="app-header full main-layout">
    <div class="header-container">
      <div class="logo-container">
        <img src="../assets/img/bitcoin-logo.svg" alt="" />
        <h2>
          <RouterLink @click="closeNavbar" to="/" class="logo"
            >Mr.BitCoin</RouterLink
          >
        </h2>
      </div>
      <span class="material-symbols-outlined menu-btn" @click="toggleNavbar"
        >menu</span
      >

      <div class="user-info" v-if="isLoggedIn && user">
        <span v-if="user">{{ welcomeMessage }}</span>
      </div>
      <nav ref="nav">
        <RouterLink @click="closeNavbar" to="/">Home</RouterLink>
        <RouterLink @click="closeNavbar" to="/contact">Contacts</RouterLink>
        <RouterLink @click="closeNavbar" to="/stats">Stats</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
import { eventBus } from '../services/eventBus.service'

export default {
  data() {
    return {
      user: null,
      counter: 100,
    }
  },
  created() {
    eventBus.on('user-updated', (user) => {
      this.user = user
      this.updateCounter()
    })

    eventBus.on('retrieve-user-data', () => {
      this.user = eventBus.emitSync('get-user')
      this.updateCounter()
    })
  },
  methods: {
    toggleNavbar() {
      this.$refs.nav.classList.toggle('menu-open')
    },
    closeNavbar() {
      this.$refs.nav.classList.remove('menu-open')
    },
    updateCounter() {
      if (this.user) {
        this.$store.dispatch('decrementCounter', this.user.tipCount || 0)
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.user !== null
    },
    welcomeMessage() {
      return `Welcome ${this.user.fullname}! ${this.$store.state.counter}₿`
    },
  },
}
</script>
