<template>
  <div class="task tasklist_task" v-bind:class="presentationselects.indexOf(task.id) >= 0 ? 'tasklist_task_selected' : task.done ? 'tasklist_task_done' : ''" @click.exact="select(task.id)" @click.shift="test(task.id)">
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
          <span v-for="(tasktag, index) in task.tags" :key="index" class="tag" :title="tasktag.name" style="margin-right: 8px;">{{ tasktag.name.slice(0, 6) }}</span>
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
    },
    test: function (taskid) {
      let selects = this.$store.getters['task/presentationselects'];
      if (selects.length > 1) {
        alert('you cannot do it.');
        return;
      }

      let tasks = this.$store.getters['task/list'];
      let taskids = tasks.map(task => task.id);
      let startpoint = taskids.indexOf(selects[0]);
      let selectedpoint = taskids.indexOf(taskid);
      let minpoint = Math.min(startpoint, selectedpoint);
      let maxpoint = Math.max(startpoint, selectedpoint);

      let si = selectedpoint < startpoint ? 0 : 1;
      let ei = selectedpoint < startpoint ? 1 : 0;
      for (let i = si; i <= (maxpoint - minpoint - ei); i++) {
        this.$store.dispatch('task/presentationselects', tasks[minpoint + i].id);
      }
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