<template>
  <div class="home">
    <div style="background-color: white; padding: 16px">
      <div>
        <table style="width: 100%;">
          <tr>
            <td style="width: 10%;">
              <button @click="showTopTaskForm" class="borderless" style="padding: 8px 16px;" v-if="form.task.top.visible === false">Create</button>
            </td>
            <td style="width: 65%; overflow: hidden;">
              <span v-for="(tag, index) in tags" :key="index" class="tag" :title="tag.name" v-bind:class="tagfilterselected.indexOf(tag.id) == -1 ? 'tagfilter' : 'tagfilterused'" style="margin-right: 4px;" @click="mutatecondtag(tag.id)">{{ tag.name.slice(0, 3) }}</span>
              <tag-filter-create-button style="margin-left: 4px" v-if="tagfilterselected.length == 0">+</tag-filter-create-button>
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
          <input type="text" placeholder="Enter your new task..." style="width: 50%; font-size: 16px; padding: 4px;" v-model="form.task.top.name" @keydown.enter="unshift" @keydown.esc="hideTopTaskForm" id="taskinputform__top" />
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
          <input type="text" placeholder="Enter your new task..." style="width: 50%; font-size: 16px; padding: 4px;" v-model="form.task.bottom.name" @keydown.enter="push" @keydown.esc="hideBottomTaskForm" id="taskinputform__bottom" />
          <button class="action" style="background-color: lightskyblue; margin-left: 8px;" @click="push">Add</button>
          <button class="action" style="margin-left: 8px;" @click="hideBottomTaskForm">Cancel</button>
        </div>
      </div>
      <div style="text-align: center; margin-top: 8px;" v-if="form.task.bottom.visible === false">
        <button @click="showBottomTaskForm" class="wide round borderless" style="padding: 8px 16px;">Create task</button>
      </div>
    </div>
    
    <!-- Backlog -->
    <div v-if="featureBacklogEnabled">
      <div v-if="backlog.visible">
        <hr style="width: 80%; margin: 64px auto 64px auto; border: 0.5px dashed lightgray" />

        <div style="background-color: white; padding: 16px">
          <p style="text-align: center">
            <span style="color: gray; font-size: 13px; cursor: pointer" @click="hideBacklogTemporary">[ Hide backlog ]</span>
          </p>
          <backlog-container />
        </div>
      </div>
      <div v-else>
        <p style="text-align: center; margin-top: 32px">
          <span style="color: gray; font-size: 13px; cursor: pointer" @click="showBacklogTemporary">[ Show backlog ]</span>
        </p>
      </div>
    </div>

    <!-- Floating -->
    <floating-bottom-menu v-if="presentationselects.length > 0" />

    <!-- Modal -->
    <tag-creation-modal v-if="tagCreationModalVisible" />
    <task-detail-modal v-if="taskDetailModalVisible" />
    <backlog-detail-modal v-if="backlogDetailModalVisible" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { createNewTask } from '../utils.js';

import PresentationTaskList from '@/components/TaskList/Presentation.vue';
import MasterTaskList from '@/components/TaskList/Master.vue';
import FloatingBottomMenu from '@/components/FloatingArea/BottomMenu.vue';
import BacklogContainer from '@/components/Backlog/Container.vue';
import TagFilterCreateButton from '@/components/TagFilter/CreateButton.vue';
import TagCreationModal from '@/components/Modal/TagCreation.vue';
import TaskDetailModal from '@/components/Modal/TaskDetail.vue';
import BacklogDetailModal from '@/components/Modal/BacklogDetail.vue';

export default {
  name: 'TasksView',
  components: {
    MasterTaskList,
    PresentationTaskList,
    FloatingBottomMenu,
    BacklogContainer,
    TagCreationModal,
    TagFilterCreateButton,
    BacklogDetailModal,
    TaskDetailModal,
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
      },
      backlog: {
        visible: true,
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
    },
    tagCreationModalVisible: {
      get () {
        return this.$store.getters['modal/tagCreationVisible'];
      }
    },
    taskDetailModalVisible: {
      get () {
        return this.$store.getters['modal/taskDetailVisible'];
      }
    },
    backlogDetailModalVisible: {
      get () {
        return this.$store.getters['modal/backlogDetailVisible'];
      }
    },
    featureBacklogEnabled: {
      get () {
        return this.$store.getters['featureEnabled/backlog'];
      }
    },
  },
  methods: {
    unshift: function (e)
    {
      if (e.keyCode == 229) return;
      if (this.form.task.top.name == '') return;
      let task = createNewTask(Date.now(), this.form.task.top.name);
      let tags = this.$store.getters['tag/list'];
      let selectedTagIds = this.$store.getters['task/presentationcondstagids'];

      // Set tag to task
      task.tags = tags.filter(tag => selectedTagIds.indexOf(tag.id) != -1);

      this.$store.dispatch('task/unshift', task);
      this.hideTopTaskForm();
      this.form.task.top.name = '';
    },
    push: function (e)
    {
      if (e.keyCode == 229) return;
      if (this.form.task.bottom.name == '') return;

      let task = createNewTask(Date.now(), this.form.task.bottom.name);
      let tags = this.$store.getters['tag/list'];
      let selectedTagIds = this.$store.getters['task/presentationcondstagids'];

      // Set tag to task
      task.tags = tags.filter(tag => selectedTagIds.indexOf(tag.id) != -1);

      this.$store.dispatch('task/push', task);
      this.form.task.bottom.name = '';
    },
    mutatecondtag: function (tagid) {
      this.$store.dispatch('task/presentationcondstagids', tagid);
    },
    showTopTaskForm: function () {
      this.form.task.top.visible = true;
      setTimeout(function () {
        document.getElementById('taskinputform__top').focus();
      }, 30);
    },
    hideTopTaskForm: function () {
      this.form.task.top.visible = false;
    },
    showBottomTaskForm: function () {
      this.form.task.bottom.visible = true;
      setTimeout(function () {
        document.getElementById('taskinputform__bottom').focus();
      }, 30);
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
    },
    hideBacklogTemporary: function () {
      this.backlog.visible = false;
    },
    showBacklogTemporary: function () {
      this.backlog.visible = true;
    },
  },
}
</script>
