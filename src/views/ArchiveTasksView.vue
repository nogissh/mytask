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
    <div>
      <button @click="clear">Clear archive tasks</button>
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
  },
  methods: {
    clear: function () {
      if (! confirm('Are you ok?')) return;
      try {
        this.$store.dispatch('archivetask/clear');
        alert('Success');
        this.$router.push({ name: 'Settings' })
      } catch {
        alert('Failed.')
      }
    }
  }
}
</script>

<style>

</style>