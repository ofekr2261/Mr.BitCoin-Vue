<template>
  <div v-if="contact" class="main-layout">
    <div class="contact-details">
      <img :src="'https://robohash.org/' + contact.name + '?set=set5'" alt="" />
      <div class="info-container">
        <h2>{{ contact.name }}</h2>
        <h3>Email: {{ contact.email }}</h3>
        <h3>Phone: {{ contact.phone }}</h3>
        <h3 v-if="!contact.balance">Balance: 0 ₿</h3>
        <h3 v-if="contact.balance">
          Balance: {{ contact.balance.toFixed(2) }} ₿
        </h3>
        <pre v-if="contact.transaction">
          transaction: {{ contact.transaction }}
        </pre>
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
    this.user = await userService.getLoggedinUser()

    eventBus.emit('retrieve-user-data')
  },
  methods: {
    async removeContact(contactId) {
      const msg = {
        txt: `Contact ${contactId} deleted.`,
        type: 'success',
        timeout: 2500,
      }
      await contactService.deleteContact(contactId)
      this.$router.push('/contact')
      eventBus.emit('user-msg', msg)
    },
    async onSubmit() {
      if (!this.tip || this.tip <= 0) {
        return
      }

      const tipAmount = Number(this.tip)

      const transaction = {
        at: new Date(),
        by: this.user.fullname,
        amount: `${tipAmount}₿`,
      }

      let updatedContact = {
        ...this.contact,
        balance: this.contact.balance
          ? this.contact.balance + tipAmount
          : tipAmount,
        transaction: this.contact.transaction
          ? [...this.contact.transaction, transaction]
          : [transaction],
      }

      await contactService.saveContact(updatedContact)
      this.contact = updatedContact

      this.user.tipCount = (this.user.tipCount || 0) + tipAmount

      eventBus.emit('user-updated', this.user)
      eventBus.emit('tip-submitted', tipAmount)

      const counter = this.$store.state.counter
      const remainingCounter = counter - tipAmount
      this.$store.commit(
        'setCounter',
        remainingCounter >= 0 ? remainingCounter : 0
      )
    },
  },
}
</script>

<style lang="scss"></style>
