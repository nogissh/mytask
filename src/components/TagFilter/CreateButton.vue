<template>
  <span id="tag-filter__create-button" @click="showTagCreationModal">+</span>
</template>

<script>
export default {
  name: 'TagFilterCreateButton',
  methods: {
    showTagCreationModal: function () {
      this.$store.commit('modal/tagCreationVisible', true);
    }
  },
  beforeMount () {
    this.$store.commit('modal/tagCreationVisible', false);
  }
}
</script>

<style>
#tag-filter__create-button:hover {
  cursor: pointer;
}
</style>
