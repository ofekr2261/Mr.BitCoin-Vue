<script>
import AppHeader from './cmps/app-header.vue'
import AppFooter from './cmps/app-footer.vue'
import UserMsg from './cmps/user-msg.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    UserMsg,
  },
}
</script>

<template>
  <div class="app main-layout">
    <AppHeader />
    <main class="app-main-container full">
      <RouterView />
    </main>
    <UserMsg />
    <AppFooter />
  </div>
</template>

<style></style>
