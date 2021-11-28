<template>
  <div class="backlog__flexparent">
    <div class="backlog__flex-name" style="height: 100%; vertical-align: middle;">
      <span style="height: 100%; vertical-align: middle;"  @click.stop="() => {}">
        {{ task.name }}
      </span>
    </div>
    <div class="backlog__flex-operate" style="text-align: right">
      <button class="action" style="margin-right: 8px" @click="toActive">Active</button>
      <button class="action" style="margin-right: 8px" @click="goDeploy">Deploy</button>
      <button @click.stop="del" class="action delete">Delete</button>
    </div>
  </div>
</template>

<script>
import { createNewTask } from '../../utils.js';

export default {
  name: 'Element',
  props: ['task', 'index'],
  methods: {
    toActive: function () {
      this.$store.dispatch('task/push', createNewTask(Date.now(), this.task.name));
      this.$store.dispatch('backlog/delete', this.task.id);
    },
    goDeploy: function () {
      this.$router.push({ name: 'BacklogDeployment', params: { id: this.task.id }})
    },
    del: function () {
      if (! confirm('Deleted task are never restore. [y/N]')) {
        return;
      }
      this.$store.dispatch('backlog/delete', this.task.id);
    },
  }
}
</script>

<style>
.backlog__flexparent {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.backlog__flex-name {
  flex-basis: 70%;
}
.backlog__flex-operate {
  flex-basis: 30%;
}
</style>
