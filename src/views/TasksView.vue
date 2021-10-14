<template>
  <div class="home">
    <div style="margin-top: 32px;">
      <table style="width: 100%;">
        <tr>
          <td style="width: 15%;">
            <button @click="showTopTaskForm" class="borderless" style="padding: 8px 16px;" v-if="form.task.top.visible === false">Create new task</button>
          </td>
          <td style="width: 60%; overflow: hidden;">
            <span v-for="(tag, index) in tags" :key="index" class="tag" v-bind:class="tagfilterselected.indexOf(tag.id) == -1 ? 'tagfilter' : 'tagfilterused'" style="margin-right: 4px;" @click="mutatecondtag(tag.id)">{{ tag.name.slice(0, 3) }}</span>
            <span @click="mutatecondtag(null)" style="margin-left: 4px; font-size: 12px; cursor: pointer;" v-if="tagfilterselected.length > 0">Clear</span>
          </td>
          <td style="width: 25%; text-align: right">
            <span v-if="presentationselects.length == 0">
              <button class="borderless" style="padding: 8px 16px; margin-right: 8px;" @click="hideDoneTask" v-if="donetaskvisible">Hide done</button>
              <button class="borderless" style="padding: 8px 16px; margin-right: 8px;" @click="showDoneTask" v-else>Show done</button>
              <button class="borderless" style="padding: 8px 16px;" @click="archiveDoneTask">Archive done</button>
            </span>
            <span v-else>
              <button class="borderless primary" style="padding: 8px 16px; margin-right: 8px;" @click="routeToMultipleTagging">Tagging</button>
              <button class="borderless danger" style="padding: 8px 16px;" @click="deleteMultipleTask">Delete</button>
            </span>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="form.task.top.visible">
      <div class="tasklist_task">
        <input type="text" placeholder="Enter your new task..." style="width: 50%; font-size: 16px; padding: 4px;" v-model="form.task.top.name" @keydown.enter="unshift" />
        <button class="action" style="background-color: lightskyblue; margin-left: 8px;" @click="unshift">Add</button>
        <button class="action" style="margin-left: 8px;" @click="hideTopTaskForm">Cancel</button>
      </div>
    </div>
    <div>
      <presentation-task-list v-if="presentationmode" />
      <master-task-list v-else />
    </div>
    <div v-if="form.task.bottom.visible">
      <div class="tasklist_task">
        <input type="text" placeholder="Enter your new task..." style="width: 50%; font-size: 16px; padding: 4px;" id="bottominputform" v-model="form.task.bottom.name" @keydown.enter="push" @keydown.esc="hideBottomTaskForm" />
        <button class="action" style="background-color: lightskyblue; margin-left: 8px;" @click="push">Add</button>
        <button class="action" style="margin-left: 8px;" @click="hideBottomTaskForm">Cancel</button>
      </div>
    </div>
    <div style="text-align: center; margin-top: 8px;" v-if="form.task.bottom.visible === false">
      <button @click="showBottomTaskForm" class="wide round borderless" style="padding: 8px 16px;">Create new task</button>
    </div>
    
    <!-- Backlog -->
    <hr style="width: 80%; margin: 64px auto; border: 0.5px dashed lightgray" />
    <div>
      <backlog-container />
    </div>
    <floating-bottom-menu v-if="presentationselects.length > 0" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { createNewTask } from '../utils.js';

import PresentationTaskList from '@/components/TaskList/Presentation.vue';
import MasterTaskList from '@/components/TaskList/Master.vue';
import FloatingBottomMenu from '@/components/FloatingArea/BottomMenu.vue';
import BacklogContainer from '@/components/BacklogContainer.vue';

export default {
  name: 'TasksView',
  components: {
    MasterTaskList,
    PresentationTaskList,
    FloatingBottomMenu,
    BacklogContainer,
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
    ...mapState({
      presentationmode: state => state.task.presentation.mode,
      tags: state => state.tag.list,
      tagfilterselected: state => state.task.presentation.conds.tagids,
      donetaskvisible: state => state.task.presentation.conds.done,
    }),
    presentationselects: {
      get () {
        return this.$store.getters['task/presentationselects'];
      }
    }
  },
  methods: {
    unshift: function (e)
    {
      if (e.keyCode == 229) return;
      if (this.form.task.top.name == '') { return; }
      this.$store.dispatch('task/unshift', createNewTask(Date.now(), this.form.task.top.name));
      this.hideTopTaskForm();
      this.form.task.top.name = '';
    },
    push: function (e)
    {
      if (e.keyCode == 229) return;
      if (this.form.task.bottom.name == '') { return; }
      this.$store.dispatch('task/push', createNewTask(Date.now(), this.form.task.bottom.name));
      this.form.task.bottom.name = '';
    },
    mutatecondtag: function (tagid) {
      this.$store.dispatch('task/presentationcondstagids', tagid);
    },
    showTopTaskForm: function () {
      this.form.task.top.visible = true;
    },
    hideTopTaskForm: function () {
      this.form.task.top.visible = false;
    },
    showBottomTaskForm: function () {
      this.form.task.bottom.visible = true;
    },
    hideBottomTaskForm: function () {
      this.form.task.bottom.visible = false;
    },
    hideDoneTask: function () {
      this.$store.dispatch('task/hidedonetask');
    },
    showDoneTask: function () {
      this.$store.dispatch('task/showdonetask');
    },
    archiveDoneTask: function () {
      if (! confirm('Archived task are never restore. [y/N]')) {
        return;
      }
      this.$store.dispatch('task/archivedonetask');
    },
    deleteMultipleTask: function () {
      if (! confirm('Delete multiple task is never restore. [y/N]')) {
        return;
      }
      this.$store.dispatch('task/multipledelete');
    },
    routeToMultipleTagging: function () {
      this.$router.push({ name: 'MultipleTagging' });
    }
  },
}
</script>
