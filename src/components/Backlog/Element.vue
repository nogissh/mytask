<template>
  <div class="backlog__flexparent">
    <div class="backlog__flex-name" style="height: 100%; vertical-align: middle;">
      <span style="height: 100%; vertical-align: middle; cursor: pointer"  @click.stop="showDetail">{{ task.name }}</span>
      <span class="backlogdetail" v-if="task.description != '' && task.description != null && task.description != undefined" style="margin-left: 8px">
        <span>
          <a>
            <img src="https://icongr.am/clarity/details.svg?size=16&color=000000" style="vertical-align: middle" />
          </a>
          <span>
            <p style="white-space: pre-wrap">{{ task.description }}</p>
          </span>
        </span>
      </span>
      <a :href="task.reference" target="_blank" v-if="task.reference != null && task.reference != undefined && task.reference != ''">
        <img src="https://icongr.am/clarity/link.svg?size=16&color=000000" style="vertical-align: middle; margin-left: 8px" />
      </a>
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
    showDetail: function () {
      this.$store.dispatch('backlog/select', this.task.id);
      this.$store.commit('modal/backlogDetailVisible', true);
    },
    toActive: function () {
      var newtask = createNewTask(Date.now(), this.task.name);
      newtask.description = this.task.description;
      newtask.reference = this.task.reference;
      this.$store.dispatch('task/push', JSON.parse(JSON.stringify(newtask)));
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

.backlogdetail span span {
  visibility: hidden;
  position: absolute;
  font-size: 13px;
  max-width: 640px;
  margin: 0;
  padding: 16px;
  background-color: white;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px;
  border-radius: 3px;
  transform: translate3d(-50px, 30px, 0);
}
.backlogdetail span:hover {
  cursor: context-menu;
}
.backlogdetail span:hover span {
  visibility: visible;
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
