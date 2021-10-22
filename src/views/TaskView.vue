<template>
  <div>
    <table style="width: 80%; min-width: 640px;" id="task-edit-table"> 
      <tr>
        <th>
          Task
        </th>
        <td>
          <input type="text" v-model="task.name" @keydown.enter="update" />
        </td>
      </tr>
      <tr>
        <th>
          Description
        </th>
        <td>
          <textarea v-model="task.description"></textarea>
        </td>
      </tr>
      <tr>
        <th>
          Reference
        </th>
        <td>
          <input type="text" v-model="task.reference" placeholder="URL" @keydown.enter="update" />
        </td>
      </tr>
      <tr>
        <th>
          Tag
        </th>
        <td>
          <span v-for="(tag, index) in task.tags" :key="index" class="tag" style="margin-right: 8px;">{{ tag.name }}</span>
          <router-link :to="`/tasks/${ $route.params.id }/tag`">Tag manager</router-link>
        </td>
      </tr>
      <tr>
        <th>
          Done
        </th>
        <td>
          <input type="checkbox" v-model="task.done">
        </td>
      </tr>
      <tr v-if="false">
        <th>
          Due date
        </th>
        <td>
          <input type="datetime-local" v-model="task.dueDate" />
        </td>
      </tr>
      <tr v-if="false">
        <th>
          Create date
        </th>
        <td>
          <p></p>
        </td>
      </tr>
    </table>
    <div style="text-align: center;">
      <button class="action" style="background-color: #87cefa;" @click="update">Update</button>
      <div style="margin-top: 8px">
        <router-link :to="{ name: 'Home' }">Back to home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskView',
  computed: {
    task: {
      get() {
        return this.$store.getters['task/get'];
      }
    }
  },
  methods: {
    update: function (e) {
      if (e.keyCode == 229) return;
      if (this.task.name == '') return;
      this.$store.dispatch('task/overwritetask', this.task);
      this.$router.push({ name: 'Home' });
    }
  },
  beforeMount () {
    this.$store.dispatch('task/select', this.$route.params.id);
  },
}
</script>

<style>
#task-edit-table td {
  padding: 16px 0;
}
</style>
