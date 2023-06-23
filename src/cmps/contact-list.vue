<template>
  <section>
    <TransitionGroup name="list" tag="ul" class="contact-list">
      <li
        class="contact-preview"
        v-for="contact in contacts"
        :key="contact._id"
      >
        <ContactPreview :contact="contact" />
        <section class="actions">
          <RouterLink :to="`/contact/${contact._id}`">
            <span class="material-symbols-outlined preview-icon">info</span>
          </RouterLink>
          <RouterLink :to="`/contact/edit/${contact._id}`">
            <span class="material-symbols-outlined preview-icon">edit</span>
          </RouterLink>
          <span
            @click="onRemoveContact(contact._id)"
            class="material-symbols-outlined preview-icon"
            >delete</span
          >
        </section>
      </li>
    </TransitionGroup>
  </section>
</template>

<script>
import ContactPreview from './contact-preview.vue'
export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onRemoveContact(contactId) {
      this.$emit('remove', contactId)
    },
  },
  components: {
    ContactPreview,
  },
}
</script>

<style lang="scss"></style>
