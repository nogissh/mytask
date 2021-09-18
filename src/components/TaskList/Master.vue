<template>
  <div>
    <draggable v-model="tasks">
      <div v-for="task in tasks" :key="task.id" class="tasklist_task">
        <div v-if="task.done === false" class="tasklist_flexparent">
          <div class="flex-name">
            <span style="height: 100%; vertical-align: middle;">
              <router-link :to="`/tasks/${ task.id }`">{{ task.name }}</router-link>
            </span>
          </div>
          <div class="flex-tag">
            <span style="height: 100%; vertical-align: middle;">
              <span v-for="(tasktag, index) in task.tags" :key="index" class="tag" style="margin-right: 8px;">{{ tasktag.name }}</span>
            </span>
          </div>
          <div class="flex-operate" style="text-align: right">
            <button @click="donetask(task.id)" class="action done" style="margin-right: 8px;">Done</button>
            <button @click="deltask(task.id)" class="action delete">Delete</button>
          </div>
        </div>
        <div v-else class="tasklist_flexparent">
          <div class="flex-name">
            <span style="height: 100%; vertical-align: middle; text-decoration:line-through;">
              <router-link :to="`/tasks/${ task.id }`">{{ task.name }}</router-link>
            </span>
          </div>
          <div class="flex-tag">
            <span style="height: 100%; vertical-align: middle;">
              <span v-for="(tasktag, index) in task.tags" :key="index" class="tag" style="margin-right: 8px;">{{ tasktag.name }}</span>
            </span>
          </div>
          <div class="flex-operate" style="text-align: right">
            <button @click="undonetask(task.id)" class="action undone" style="margin-right: 8px;">undone</button>
            <button @click="deltask(task.id)" class="action delete">Delete</button>
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TaskList',
  components: {
    draggable
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
  methods: {
    donetask: function (id) {
      this.$store.dispatch('task/done', id);
    },
    undonetask: function (id) {
      this.$store.dispatch('task/undone', id);
    },
    deltask: function (id) {
      if (! confirm('Deleted task are never restore. [y/N]')) {
        return;
      }
      this.$store.dispatch('task/delete', id);
    }
  },
  beforeMount () {
    this.$store.dispatch('task/presentationlist');
  }
}
</script>

<style>

</style>
