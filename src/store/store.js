import { userStore } from './user.store.js'
import { contactStore } from './contact.store.js'
import { createStore } from 'vuex'

export const myStore = createStore({
  strict: true,
  state() {
    return {}
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    contactStore,
    userStore,
  },
})

myStore.subscribe((cmd, state) => {
  // console.log('**** Store state changed: ****')
  // console.log('Command:', cmd.payload)
  // console.log('storeState:\n', state)
  // console.log('*******************************')
})
