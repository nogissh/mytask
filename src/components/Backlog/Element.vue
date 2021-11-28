<template>
  <div class="backlog__flexparent">
    <div class="backlog__flex-name" style="height: 100%; vertical-align: middle;">
      <span style="height: 100%; vertical-align: middle;"  @click.stop="() => {}">
        {{ task.name }}
      </span>
    </div>
    <div class="backlog__flex-operate" style="text-align: right">
      <button class="std antisquare" style="margin-right: 8px" @click="toActive">Activate</button>
      <span class="backlogmenu">
        <button @click.stop="mutateBacklogmenuVisibility" class="std antisquare">...</button>
        <ul v-if="visibility.backlogmenu">
          <li @click.stop="goDeploy">Deploy</li>
          <li @click.stop="del">Delete</li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script>
import { createNewTask } from '../../utils.js';

export default {
  name: 'Element',
  props: ['task', 'index'],
  data () {
    return {
      visibility: {
        backlogmenu: false,
      }
    }
  },
  methods: {
    toActive: function () {
      this.$store.dispatch('task/push', createNewTask(Date.now(), this.task.name));
      this.$store.dispatch('backlog/delete', this.task.id);
    },
    goDeploy: function () {
      this.mutateBacklogmenuVisibility();
      this.$router.push({ name: 'BacklogDeployment', params: { id: this.task.id }})
    },
    del: function () {
      if (! confirm('Deleted task are never restore. [y/N]')) {
        return;
      }
      this.mutateBacklogmenuVisibility();
      this.$store.dispatch('backlog/delete', this.task.id);
    },
    mutateBacklogmenuVisibility: function () {
      this.visibility.backlogmenu = !this.visibility.backlogmenu;
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
  flex-basis: 80%;
}
.backlog__flex-operate {
  flex-basis: 20%;
}

.backlogmenu button:hover {
  background-color: gray;
}
.backlogmenu ul {
  list-style: none;
  position: absolute;
  text-align: center;
  font-size: 13px;
  width: 100px;
  margin: 0;
  padding: 8px 0;
  background-color: white;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px;
  border-radius: 3px;
  transform: translate3d(80px, 16px, 0px);
}
.backlogmenu ul li {
  cursor: pointer;
  padding: 4px 0;
}
.backlogmenu ul li:hover {
  background-color: #eee;
}
</style>
