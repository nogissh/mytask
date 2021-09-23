<template>
  <div class="task tasklist_flexparent">
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
        <span v-for="(tasktag, index) in task.tags" :key="index" class="tag" style="margin-right: 8px;">{{ tasktag.name }}</span>
      </span>
    </div>
    <div class="flex-operate" style="text-align: right">
      <!-- Done Button -->
      <button @click="donetask(task.id)" class="action done" style="margin-right: 8px;" v-if="task.done === false">Done</button>
      <button @click="undonetask(task.id)" class="action undone" style="margin-right: 8px;" v-else>Undone</button>

      <!-- Delete Button -->
      <button @click="deltask(task.id)" class="action delete">Delete</button>
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

</style>