<template>
  <div>
    <div style="margin-top: 24px">
      <router-link :to="{ name: 'Settings' }">Back to setting page</router-link>
    </div>
    <div>
      <h1>Archived tasks</h1>
      <ul>
        <li v-for="(archivetask, index) in archivetasks" :key="index">{{ archivetask.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArchiveTasksView',
  computed: {
    archivetasks: {
      get () {
        return this.$store.getters['archivetask/list'];
      }
    }
  }
}
</script>

<style>

</style>