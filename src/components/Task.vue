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
          <span class="taskdetail" v-if="task.description != '' && task.description != null && task.description != undefined" style="margin-left: 8px">
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
        </span>
      </div>
      <div class="flex-tag">
        <span style="height: 100%; vertical-align: middle;" @click.stop="() => {}">
          <span v-for="(tasktag, index) in task.tags" :key="index" class="tag" :title="tasktag.name" style="margin-right: 8px;">{{ tasktag.name.slice(0, 6) }}</span>
        </span>
      </div>
      <div class="flex-operate" style="text-align: right">
        <div class="taskmenu">
          <button @click.stop="mutateTaskmenuVisibility" class="std antisquare">...</button>
          <ul v-if="visibility.taskmenu">
            <li @click.stop="deltask(task.id)">Delete</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['task'],
  data () {
    return {
      visibility: {
        taskmenu: false,
      }
    }
  },
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
    },
    mutateTaskmenuVisibility: function () {
      this.visibility.taskmenu = !this.visibility.taskmenu;
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

.taskdetail span span {
  visibility: hidden;
  position: absolute;
  font-size: 13px;
  margin: 0;
  padding: 16px;
  background-color: white;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px;
  border-radius: 3px;
  transform: translate3d(-50px, 30px, 0);
}
.taskdetail span:hover {
  cursor: context-menu;
}
.taskdetail span:hover span {
  visibility: visible;
}

.taskmenu button:hover {
  background-color: gray;
}
.taskmenu ul {
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
  transform: translate3d(40px, 16px, 0px);
}
.taskmenu ul li {
  cursor: pointer;
  padding: 4px 0;
}
.taskmenu ul li:hover {
  background-color: #eee;
}
</style>