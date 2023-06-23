import { contactService } from '../services/contact.service'

export const contactStore = {
  state: {
    contacts: [],
  },
  getters: {
    contacts: ({ contacts }) => contacts,
  },
  mutations: {
    setContacts(state, { contacts }) {
      state.contacts = contacts
    },
    removeContact(state, { contactId }) {
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== contactId
      )
    },
    addContact(state, { contact }) {
      const existingContact = state.contacts.find((c) => c._id === contact._id)
      if (!existingContact) {
        state.contacts.push(contact)
      }
    },
    updateContact(state, { contact }) {
      const idx = state.contacts.findIndex((p) => p._id === contact._id)
      state.contacts.splice(idx, 1, contact)
    },
  },
  actions: {
    async loadContacts({ commit }, { filterBy }) {
      const contacts = await contactService.getContacts(filterBy)
      commit('setContacts', { contacts })
    },
    async removeContact({ commit }, payload) {
      commit(payload)
      try {
        await contactService.deleteContact(payload.contactId)
        commit({ type: 'removeContact' })
      } catch (err) {
        throw err
      }
    },
    async saveContact({ commit }, { contact }) {
      const actionType = contact._id ? 'updateContact' : 'addContact'
      try {
        const savedContact = await contactService.saveContact(contact)
        commit({ type: actionType, contact: savedContact })
        return savedContact
      } catch (err) {
        throw err
      }
    },
  },
}
