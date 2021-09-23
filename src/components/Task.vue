<template>
  <div class="task tasklist_task" v-bind:class="presentationselects.indexOf(task.id) >= 0 ? 'tasklist_task_selected' : task.done ? 'tasklist_task_done' : ''" @click="select(task.id)">
    <div class="tasklist_flexparent">
      <div class="flex-state">
        <input type="checkbox" class="task-checkbox" @click.stop="donetask(task.id)" v-if="task.done === false" />
        <input type="checkbox" class="task-checkbox" checked @click.stop="undonetask(task.id)" v-else />
      </div>
      <div class="flex-name">
        <span style="height: 100%; vertical-align: middle;" v-bind:style="task.done ? { 'text-decoration': 'line-through' } : {}" @click.stop="() => {}">
          <router-link :to="`/tasks/${ task.id }`" style="text-decoration: none" v-bind:style="task.done ? { 'color': '#999' } : { 'color': '#000' }">{{ task.name }}</router-link>
        </span>
      </div>
      <div class="flex-tag">
        <span style="height: 100%; vertical-align: middle;" @click.stop="() => {}">
          <span v-for="(tasktag, index) in task.tags" :key="index" class="tag" style="margin-right: 8px;">{{ tasktag.name.slice(0, 6) }}</span>
        </span>
      </div>
      <div class="flex-operate" style="text-align: right">
        <button @click.stop="deltask(task.id)" class="action delete" v-if="presentationselects.length == 0">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['task'],
  computed: {
    presentationselects: {
      get () {
        return this.$store.getters['task/presentationselects'];
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
    },
    select: function (id) {
      this.$store.dispatch('task/presentationselects', id);
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