<template>
  <div>
    <div>
      <h2>Selected tasks</h2>
      <ul>
        <li v-for="(task, taskIndex) in selectedtasks" :key="taskIndex">
          {{ task.name }}
        </li>
      </ul>
    </div>
    <div>
      <h2>Tags</h2>
      <table>
        <tr v-for="(tag, tagIndex) in tags" :key="tagIndex">
          <td>
            {{ tag.name }}
          </td>
          <td>
            <button @click="select(tag.id)" v-if="selectedtags.indexOf(tag.id) == -1">Select</button>
            <button @click="remove(tag.id)" v-else>Remove</button>
          </td>
        </tr>
      </table>
    </div>
    <div style="width: 100%; text-align: center">
      <button @click="apply">Apply</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultipleTaggingView',
  computed: {
    selectedtasks: {
      get () {
        return this.$store.getters['task/gets'];
      }
    },
    tags: {
      get () {
        return this.$store.getters['tag/list'];
      }
    }
  },
  data () {
    return {
      selectedtags: [],
    }
  },
  methods: {
    select: function (tagid) {
      this.selectedtags.push(tagid);
    },
    remove: function (tagid) {
      let index = this.selectedtags.indexOf(tagid);
      this.selectedtags.splice(index, 1);
    },
    apply: function () {
      if (! confirm('Overwrites task tag.\nThis operation will not be able to undone.')) return;
      let _tags = this.tags.filter(tag => this.selectedtags.indexOf(tag.id) >= 0);
      this.$store.dispatch('task/multipletagging', _tags);

      // After completed
      alert('Completed.')
      this.$store.dispatch('task/presentationselects', null);
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>