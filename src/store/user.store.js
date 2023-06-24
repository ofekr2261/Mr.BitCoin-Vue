import { userService } from '../services/user.service.js'

export const userStore = {
  state: {
    user: userService.getLoggedinUser(),
  },
  getters: {
    user({ user }) {
      return user
    },
  },
  mutations: {
    updateOrder(state, { order }) {
      const idx = state.user.orders.findIndex((o) => o._id === order._id)
      state.user.orders.splice(idx, 1, order)
    },
    setUser(state, { user }) {
      state.user = user
    },
    setUserBalance(state, { balance }) {
      state.user.balance = balance
    },
  },
  actions: {
    checkout({ commit, getters }) {
      return userService
        .addOrder(getters.cart, getters.cartTotal)
        .then((user) => {
          commit({ type: 'setUser', user })
          commit({ type: 'clearCart' })
          return user.balance
        })
    },
    changeOrderStatus({ commit }, { orderId, status }) {
      return userService.changeOrderStatus(orderId, status).then((order) => {
        commit({ type: 'updateOrder', order })
        return order
      })
    },
    deposit(context, { amount }) {
      console.log('context', context)
      return userService.updateBalance(amount).then((balance) => {
        context.commit({ type: 'setUserBalance', balance })
        return balance
      })
    },
    async login({ commit }, { username, password }) {
      const isLoggedIn = await userService.login({ username, password })
      if (isLoggedIn) {
        const user = {
          name: username,
        }
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        commit({ type: 'setUser', user })
        return true
      }
      return false
    },

    async signup({ commit }, { username, password, fullname }) {
      await userService.signup({ username, password, fullname })
      const user = userService.getLoggedinUser()
      commit({ type: 'setUser', user })
    },
  },
}
