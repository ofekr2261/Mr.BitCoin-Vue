<template>
  <header class="app-header full main-layout">
    <div class="header-container">
      <div class="logo-container">
        <img src="../assets/img/bitcoin-logo.svg" alt="" />
        <h2>
          <RouterLink @click="closeNavbar" to="/home" class="logo"
            >Mr.BitCoin</RouterLink
          >
        </h2>
      </div>
      <span class="material-symbols-outlined menu-btn" @click="toggleNavbar"
        >menu</span
      >

      <div class="user-info" v-if="isLoggedIn">
        <span>Welcome {{ user.fullname }}!</span>
      </div>
      <nav ref="nav">
        <RouterLink @click="closeNavbar" to="/home">Home</RouterLink>
        <RouterLink @click="closeNavbar" to="/contact">Contacts</RouterLink>
        <RouterLink @click="closeNavbar" to="/stats">Stats</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
import { userService } from '../services/user.service.js'
import { bitcoinService } from '../services/bitcoin.service.js'
export default {
  data() {
    return {
      user: null,
    }
  },
  async created() {
    this.user = userService.getLoggedinUser()
  },
  methods: {
    toggleNavbar() {
      this.$refs.nav.classList.toggle('menu-open')
    },
    closeNavbar() {
      this.$refs.nav.classList.remove('menu-open')
    },
  },
  computed: {
    isLoggedIn() {
      return this.user !== null
    },
  },
}
</script>
