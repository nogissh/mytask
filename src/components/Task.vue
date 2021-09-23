<template>
  <div class="task tasklist_task" v-bind:class="task.done ? 'tasklist_task_done' : ''">
    <div class="tasklist_flexparent">
      <div class="flex-state">
        <input type="checkbox" class="task-checkbox" @click="donetask(task.id)" v-if="task.done === false" />
        <input type="checkbox" class="task-checkbox" checked @click="undonetask(task.id)" v-else />
      </div>
      <div class="flex-name">
        <span style="height: 100%; vertical-align: middle;" v-if="task.done === false">
          <router-link :to="`/tasks/${ task.id }`">{{ task.name }}</router-link>
        </span>
        <span style="height: 100%; vertical-align: middle; text-decoration:line-through;" v-else>
          <router-link :to="`/tasks/${ task.id }`">{{ task.name }}</router-link>
        </span>
      </div>
      <div class="flex-tag">
        <span style="height: 100%; vertical-align: middle;">
          <span v-for="(tasktag, index) in task.tags" :key="index" class="tag" style="margin-right: 8px;">{{ tasktag.name.slice(0, 6) }}</span>
        </span>
      </div>
      <div class="flex-operate" style="text-align: right">
        <button @click="deltask(task.id)" class="action delete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['task'],
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
}
</script>

<style>
.task-checkbox {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}
</style>