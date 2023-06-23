<template>
  <form @submit.prevent="save" v-if="contact" class="contact-edit main-layout">
    <div :class="['box', { 'custom-box': contact.name }]">
      <h2>{{ getTitle }}</h2>
      <img :src="'https://robohash.org/' + contact.name + '?set=set5'" alt="" />
      <div class="input-container">
        <input
          type="text"
          v-model="contact.name"
          placeholder="Enter contact name..."
        />
        <input
          type="email"
          v-model="contact.email"
          placeholder="Enter contact email..."
        />
        <input
          type="tel"
          v-model.number="contact.phone"
          placeholder="Enter contact phone..."
        />
      </div>
      <button class="primary">Save</button>
      <a @click="clearInfo" class="clear-btn">Clear</a>
    </div>
    <RouterLink class="close-btn" to="/contact"
      ><span class="material-symbols-outlined">close</span></RouterLink
    >
  </form>
</template>

<script>
import { contactService } from '../services/contact.service.js'
export default {
  data() {
    return {
      contact: null,
    }
  },
  async created() {
    const contactId = this.$route.params._id
    if (contactId) {
      this.contact = await contactService.getContactById(contactId)
    } else {
      this.contact = contactService.getEmptyContact()
    }
  },
  methods: {
    async save() {
      if (!this.contact.name || !this.contact.email || !this.contact.phone) {
        alert('Please fill all the information about the contact')
        return
      }
      const contact = this.contact
      await this.$store.dispatch({ type: 'saveContact', contact })
      this.$router.push('/contact')
    },
    clearInfo() {
      this.contact = contactService.getEmptyContact()
    },
  },
  computed: {
    getTitle() {
      return this.contact._id ? `Edit ${this.contact.name}` : 'Add new contact'
    },
  },
}
</script>

<style lang="scss"></style>
