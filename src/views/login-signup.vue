<template>
  <div class="login-signup">
    <div class="box">
      <h2 v-if="isSignUp" class="login-title">Sign Up</h2>
      <h2 v-if="!isSignUp" class="login-title">Log In</h2>
      <p v-if="isSignUp" class="login-subtitle large">
        Already a member?
        <span class="toggle-btn" @click="onToggleSignUp">Log in</span>
      </p>
      <p v-if="!isSignUp" class="login-subtitle large">
        Don't have an account?
        <span class="toggle-btn" @click="onToggleSignUp">Sign up</span>
      </p>
      <form class="login-signup-form" @submit.prevent="onSubmit">
        <div className="form-container">
          <div className="txt-field">
            <input type="text" v-model="user.name" placeholder="User name..." />
          </div>
          <div>
            <input
              type="password"
              v-model="user.password"
              placeholder="Password..."
            />
          </div>
          <button v-if="isSignUp" className="login-signup-btn">Signup</button>
          <button v-if="!isSignUp" className="login-signup-btn">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { userService } from '../services/user.service.js'
export default {
  data() {
    return {
      user: {
        name: '',
        password: null,
      },
      isSignUp: false,
    }
  },
  methods: {
    async onSubmit() {
      if (this.isSignUp) {
        await userService.signup({
          username: this.user.name,
          password: this.user.password,
          fullname: this.user.name,
        })
        this.$router.push('/home')
      } else {
        const isLoggedIn = await userService.login({
          username: this.user.name,
          password: this.user.password,
        })
        if (isLoggedIn) this.$router.push('/home')
      }
    },

    onToggleSignUp() {
      this.isSignUp = !this.isSignUp
    },
  },
}
</script>
