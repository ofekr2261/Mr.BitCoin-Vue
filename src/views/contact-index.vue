<template>
  <div class="contact-index main-layout full">
    <ContactsFilter @filter="onSetFilterBy" />
    <RouterLink class="add-link" to="/contact/edit"
      ><button class="primary">Add a Contact</button></RouterLink
    >
    <ContactsList
      @remove="removeContact"
      v-if="contacts"
      :contacts="contacts"
    />
  </div>
</template>

<script>
import { eventBus } from '../services/eventBus.service.js'
import ContactsList from '../cmps/contact-list.vue'
import ContactsFilter from '../cmps/contact-filter.vue'

export default {
  data() {
    return {
      filterBy: {},
    }
  },
  async created() {
    const filterBy = this.filterBy
    this.$store.dispatch({ type: 'loadContacts', filterBy })
  },
  methods: {
    async removeContact(contactId) {
      try {
        this.$store.dispatch({ type: 'removeContact', contactId })
        const msg = {
          txt: `Contact ${contactId} deleted.`,
          type: 'success',
          timeout: 2500,
        }
        eventBus.emit('user-msg', msg)
      } catch (err) {
        const msg = {
          txt: `Cannot remove ${contactId}.`,
          type: 'error',
          timeout: 2500,
        }
        eventBus.emit('user-msg', msg)
        console.error('Cannot remove contact', err)
      }
    },
    onSetFilterBy(filterBy) {
      this.filterBy = filterBy
      this.$store.dispatch({ type: 'loadContacts', filterBy })
    },
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts
    },
  },
  components: {
    ContactsList,
    ContactsFilter,
  },
}
</script>

<style lang="scss"></style>
