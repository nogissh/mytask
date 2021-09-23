<template>
  <div>
    <div v-for="task in tasks" :key="task.id" class="tasklist_task">
      <task v-bind:task="task" />
    </div>
  </div>
</template>

<script>
import Task from './../Task.vue'

export default {
  name: 'TaskList',
  components: {
    Task
  },
  computed: {
    tasks:{
      get() {
        return this.$store.getters['task/presentationlist'];
      },
    },
  },
  beforeMount () {
    this.$store.dispatch('task/presentationlist');
  }
}
</script>

<style>

</style>
