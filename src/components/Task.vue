<template>
  <div class="task tasklist_task" v-bind:class="presentationselects.indexOf(task.id) >= 0 ? 'tasklist_task_selected' : task.done ? 'tasklist_task_done' : ''" @click.exact="select(task.id)" @click.shift="test(task.id)">
    <div class="tasklist_flexparent">
      <div class="task-flex-state">
        <input type="checkbox" class="task-checkbox" v-model="task.done" @click.stop="mutatestatus(task.id)" />
      </div>
      <div class="task-flex-name">
        <span style="height: 100%; vertical-align: middle;" v-bind:style="task.done ? { 'color': '#999', 'text-decoration': 'line-through' } : {}" @click.stop="() => {}">
          <span style="cursor: pointer" @click.stop="showDetail">{{ task.name }}</span>
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
      <div class="task-flex-tag">
        <span style="height: 100%; vertical-align: middle;" @click.stop="() => {}">
          <span v-for="(tasktag, index) in task.tags" :key="index" class="tag" :title="tasktag.name" style="margin-right: 8px;">{{ tasktag.name.slice(0, 6) }}</span>
        </span>
      </div>
      <div class="task-flex-spent" style="text-align: center">
        <span style="height: 100%; vertical-align: middle; font-size: 13px" v-bind:style="task.done ? { 'color': '#999', 'text-decoration': 'line-through' } : {}" @click.stop="() => {}">
          <span v-if="spentday == 0">Today</span>
          <span v-else-if="spentday > 0 && spentday <= 30">{{ spentday }}d later</span>
          <span v-else-if="spentday > 30">Lazy</span>
          <span v-else></span>
        </span>
      </div>
      <div class="task-flex-operate" style="text-align: right">
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
import { daygap } from '../utils.js';

export default {
  name: 'Task',
  props: ['task'],
  data () {
    return {
      visibility: {
        taskmenu: false,
      },
      spentday: null,
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
    showDetail: function () {
      this.$store.dispatch('task/select', this.task.id);
      this.$store.commit('modal/taskDetailVisible', true);
    },
    mutatestatus: function (id) {
      if (this.task.done) {
        this.$store.dispatch('task/undone', id);
      } else {
        this.$store.dispatch('task/done', id);
      }
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
  beforeMount () {
    this.spentday = daygap(Date.now(), this.task.createdat);
  }
}
</script>

<style>
.task-checkbox {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}

.task-flex-state {
  flex-basis: 5%;
}
.task-flex-name {
  flex-basis: 50%;
}
.task-flex-tag {
  flex-basis: 20%;
}
.task-flex-spent {
  flex-basis: 10%;
}
.task-flex-operate {
  flex-basis: 5%;
}

.taskdetail span span {
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