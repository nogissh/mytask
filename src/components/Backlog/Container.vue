<template>
  <div>
    <h2>Backlog</h2>
    <table style="width: 100%;">
      <tr>
        <td style="width: 50%;">
          <button class="borderless" style="padding: 8px 16px;" @click="showTopTaskForm" v-if="form.task.top.visible === false">Create</button>
        </td>
        <td style="width: 50%; text-align: right"></td>
      </tr>
    </table>
    <div v-if="form.task.top.visible">
      <div class="backlog__task">
        <input type="text" placeholder="Enter your new task..." style="width: 50%; font-size: 16px; padding: 4px;" v-model="form.task.top.name" @keydown.enter="unshift" @keydown.esc="hideTopTaskForm" id="backloginputform__top" />
        <button class="action" style="background-color: lightskyblue; margin-left: 8px;" @click="unshift">Add</button>
        <button class="action" style="margin-left: 8px;" @click="hideTopTaskForm">Cancel</button>
      </div>
    </div>
    <div>
      <draggable v-model="list">
        <div v-for="(task, index) in list" :key="index" class="backlog__task">
          <backlog-element :task="task" :index="index" />
        </div>
      </draggable>
    </div>
    <div v-if="form.task.bottom.visible">
      <div class="backlog__task">
        <input type="text" placeholder="Enter your new task..." style="width: 50%; font-size: 16px; padding: 4px;" v-model="form.task.bottom.name" @keydown.enter="push" @keydown.esc="hideBottomTaskForm" id="backloginputform__bottom" />
        <button class="action" style="background-color: lightskyblue; margin-left: 8px;" @click="push">Add</button>
        <button class="action" style="margin-left: 8px;" @click="hideBottomTaskForm">Cancel</button>
      </div>
    </div>
    <div style="text-align: center; margin-top: 8px;" v-if="form.task.bottom.visible === false">
      <button @click="showBottomTaskForm" class="wide round borderless" style="padding: 8px 16px;">Create backlog task</button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BacklogElement from './Element.vue';

import { createNewTask } from '../../utils.js';

export default {
  name: 'Container',
  components: {
    draggable,
    BacklogElement,
  },
  data () {
    return {
      form: {
        task: {
          top: {
            visible: false,
            name: ''
          },
          bottom: {
            visible: false,
            name: ''
          }
        }
      }
    }
  },
  computed: {
    list: {
      get () {
        return this.$store.getters['backlog/list'];
      },
      set (value) {
        return this.$store.dispatch('backlog/overwrite', value);
      }
    }
  },
  methods: {
    showTopTaskForm: function () {
      this.form.task.top.visible = true;
      setTimeout(function () {
        document.getElementById('backloginputform__top').focus();
      }, 30);
    },
    hideTopTaskForm: function () {
      this.form.task.top.visible = false;
    },
    showBottomTaskForm: function () {
      this.form.task.bottom.visible = true;
      setTimeout(function () {
        document.getElementById('backloginputform__bottom').focus();
      }, 30);
    },
    hideBottomTaskForm: function () {
      this.form.task.bottom.visible = false;
    },
    unshift: function (e)
    {
      if (e.keyCode == 229) return;
      if (this.form.task.top.name == '') { return; }
      this.$store.dispatch('backlog/unshift', createNewTask(Date.now(), this.form.task.top.name));
      this.hideTopTaskForm();
      this.form.task.top.name = '';
    },
    push: function (e)
    {
      if (e.keyCode == 229) return;
      if (this.form.task.bottom.name == '') { return; }
      this.$store.dispatch('backlog/push', createNewTask(Date.now(), this.form.task.bottom.name));
      this.form.task.bottom.name = '';
    },
  }
}
</script>

<style>
.backlog__task {
  margin-top: 8px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
}
</style>
