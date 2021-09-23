<template>
  <div>
    <draggable v-model="tasks">
      <div v-for="task in tasks" :key="task.id" class="tasklist_task">
        <task v-bind:task="task" />
      </div>
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
