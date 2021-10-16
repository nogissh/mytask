<template>
  <div>
    <div>
      <h2>Tag</h2>
      <div>
        <input type="text" placeholder="Tag name" v-model="tag.form.name" style="width: 240px; font-size: 16px; padding: 4px;" />
      </div>
    </div>

    <div>
      <h2>Task</h2>
      <div>
        <div class="tasklist_task" v-for="(task, index) in task.list" :key="index">
          <input type="text" v-model="task.name" placeholder="Task name" style="width: 480px; font-size: 16px; padding: 4px;" />
          <button @click="remove(index)" class="action" style="margin-left: 8px">remove</button>
        </div>
        <div class="tasklist_task">
          <input type="text" placeholder="Task name" v-model="task.form.name" @keydown.enter="create" style="width: 480px; font-size: 16px; padding: 4px;" />
          <button @click="create" class="action" style="margin-left: 8px">Add</button>
        </div>
      </div>
    </div>

    <div style="margin-top: 24px; text-align: center">
      <button class="action primary stdpadding borderless" @click="submit">Submit</button>
      <div style="margin-top: 8px">
        <router-link :to="{ name: 'Home' }">Cancel</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { createNewTask, createNewTag } from '../utils.js';

export default {
  name: 'BacklogDeploymentView',
  data () {
    return {
      task: {
        list: [],
        form: {
          name: '',
        }
      },
      tag: {
        form: {
          name: '',
        }
      }
    }
  },
  methods: {
    submit: function () {
      if (this.task.list.length == 0) {
        alert('No task applied.');
        return;
      }

      let empties = this.task.list.filter(task => task.name == '' || task.name == null);
      if (empties.length > 0) {
        alert('No name task included.');
        return;
      }

      // Create tag
      let tagid = Date.now();
      this.$store.dispatch('tag/add', createNewTag(tagid, this.tag.form.name));

      // Get tag
      let tags = this.$store.getters['tag/list'];
      let tag = tags.filter(tag => tag.id == tagid)[0];

      // Create task
      for (let i = 0; i < this.task.list.length; i++) {
        let task = this.task.list[i];
        task.tags.push(tag);
        this.$store.commit('task/push', task);
        this.$store.dispatch('task/persistlocalstrage');
      }

      this.$store.dispatch('backlog/delete', this.$route.params.id);
      this.$router.push({ name: 'Home' })
    },
    create: function (e) {
      if (e.keyCode == 229) return;
      if (this.task.form.name == '') return;
      this.task.list.push(createNewTask(Date.now(), this.task.form.name))
      this.task.form.name = '';
    },
    remove: function (idx) {
      this.task.list.splice(idx, 1);
    }
  },
  beforeMount () {
    let list = this.$store.getters['backlog/list'];
    let tasks = list.filter(task => task.id == this.$route.params.id)
    this.tag.form.name = tasks[0].name;
  }
}
</script>

<style>

</style>
