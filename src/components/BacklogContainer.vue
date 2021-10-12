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
        <input type="text" placeholder="Enter your new task..." style="width: 50%; font-size: 16px; padding: 4px;" v-model="form.task.top.name" @keydown.enter="unshift" />
        <button class="action" style="background-color: lightskyblue; margin-left: 8px;" @click="unshift">Add</button>
        <button class="action" style="margin-left: 8px;" @click="hideTopTaskForm">Cancel</button>
      </div>
    </div>
    <div>
      <draggable v-model="list">
        <div v-for="(task, index) in list" :key="index" class="backlog__task">
          <div class="backlog__flexparent">
            <div class="backlog__flex-name" style="height: 100%; vertical-align: middle;">
              <span style="height: 100%; vertical-align: middle;"  @click.stop="() => {}">
                {{ task.name }}
              </span>
            </div>
            <div class="backlog__flex-operate" style="text-align: right">
              <button @click.stop="del(task.id)" class="action delete">Delete</button>
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <div v-if="form.task.bottom.visible">
      <div class="backlog__task">
        <input type="text" placeholder="Enter your new task..." style="width: 50%; font-size: 16px; padding: 4px;" id="bottominputform" v-model="form.task.bottom.name" @keydown.enter="push" @keydown.esc="hideBottomTaskForm" />
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

export default {
  name: 'BacklogContainer',
  components: {
    draggable,
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
    unshift: function (e)
    {
      if (e.keyCode == 229) return;
      if (this.form.task.top.name == '') { return; }
      this.$store.dispatch('backlog/unshift', { id: Date.now(), name: this.form.task.top.name });
      this.hideTopTaskForm();
      this.form.task.top.name = '';
    },
    push: function (e)
    {
      if (e.keyCode == 229) return;
      if (this.form.task.bottom.name == '') { return; }
      this.$store.dispatch('backlog/push', { id: Date.now(), name: this.form.task.bottom.name });
      this.form.task.bottom.name = '';
    },
    del: function (id) {
      if (! confirm('Deleted task are never restore. [y/N]')) {
        return;
      }
      this.$store.dispatch('backlog/delete', id);
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
</style>
