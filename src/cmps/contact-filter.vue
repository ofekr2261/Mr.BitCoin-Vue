<template>
  <div class="contact-filter full">
    <p class="large">Search</p>
    <input
      @input="onFilter"
      v-model="filterBy.name"
      type="text"
      placeholder="Enter name..."
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        name: '',
      },
    }
  },
  methods: {
    onFilter() {
      this.$emit('filter', this.filterBy)
    },
  },
}
</script>

<style lang="scss"></style>
