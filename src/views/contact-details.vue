<template>
  <div v-if="contact" class="main-layout">
    <div class="contact-details">
      <img :src="'https://robohash.org/' + contact.name + '?set=set5'" alt="" />
      <div class="info-container">
        <h2>{{ contact.name }}</h2>
        <h3>Email: {{ contact.email }}</h3>
        <h3>Phone: {{ contact.phone }}</h3>
        <h3 v-if="!contact.balance">Balance: 0 ₿</h3>
        <h3 v-if="contact.balance">Balance: {{ contact.balance }} ₿</h3>
        <pre v-if="contact.transaction">
transaction: {{ contact.transaction }}</pre
        >
        <form @submit.prevent="onSubmit" class="tip-form">
          <input v-model="tip" type="number" />
          <button>Tip!</button>
        </form>
        <RouterLink class="close-btn" to="/contact"
          ><span class="material-symbols-outlined">close</span></RouterLink
        >
        <a class="delete-btn" @click="removeContact(contact._id)"
          >Delete contact</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { contactService } from '../services/contact.service.js'
import { userService } from '../services/user.service.js'
import { eventBus } from '../services/eventBus.service.js'

export default {
  data() {
    return {
      contact: null,
      user: null,
      tip: null,
    }
  },
  async created() {
    const contactId = this.$route.params._id
    this.contact = await contactService.getContactById(contactId)
    this.user = await userService.getLogedUser()
  },
  methods: {
    async removeContact(contactId) {
      const msg = {
        txt: `Contacts ${contactId} deleted.`,
        type: 'success',
        timeout: 2500,
      }
      await contactService.deleteContact(contactId)
      this.$router.push('/contact')
      eventBus.emit('user-msg', msg)
    },
    async onSubmit() {
      const transaction = {
        at: new Date(),
        by: this.user.name,
        amount: this.tip,
      }
      let contact = this.contact
      console.log('contact:', contact)
      contact.balance
        ? (contact.balance += this.tip)
        : (contact.balance = this.tip)
      if (!contact.transaction) contact.transaction = []
      contact.transaction.push(transaction)
      contactService.saveContact(contact)
    },
  },
}
</script>

<style lang="scss"></style>
