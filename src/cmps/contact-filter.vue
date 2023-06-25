<template>
  <div class="contact-filter full">
    <p class="large" @click="focusInput">Search</p>
    <input
      ref="searchInput"
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
    focusInput() {
      this.$refs.searchInput.focus()
    },
    onFilter() {
      this.$emit('filter', this.filterBy)
    },
  },
}
</script>

<style lang="scss"></style>
