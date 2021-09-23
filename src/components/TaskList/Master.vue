<template>
  <div>
    <draggable v-model="tasks">
      <task v-for="task in tasks" :key="task.id" v-bind:task="task" />
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Task from './../Task.vue'

export default {
  name: 'TaskList',
  components: {
    draggable,
    Task,
  },
  computed: {
    tasks:{
      get() {
        return this.$store.getters['task/list'];
      },
      set(val) {
        this.$store.dispatch('task/draggablesort', val);
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('task/presentationlist');
  }
}
</script>

<style>

</style>
