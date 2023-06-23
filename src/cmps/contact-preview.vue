<template>
  <article @click="redirectToContact">
    <img :src="'https://robohash.org/' + contact.name + '?set=set5'" alt="" />
    <p>{{ contact.name }}</p>
  </article>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  methods: {
    redirectToContact() {
      this.$router.push(`/contact/${this.contact._id}`)
    },
  },
}
</script>

<style lang="scss"></style>
