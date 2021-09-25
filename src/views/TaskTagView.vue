<template>
  <div style="margin: 0 auto; margin-top: 24px; width: 100%; max-width: 360px;">
    <table style="width: 100%; text-align: center;" id="tasktag-manager-table">
      <tr v-for="(tag, index) in tags" :key="index">
        <td style="width: 70%">
          <span class="tag">{{ tag.name }}</span>
        </td>
        <td style="width: 30%">
          <button class="action" style="background-color: lightskyblue;" @click="pushtag(index)" v-if="tasktagids.indexOf(tag.id) == -1">add</button>
          <button class="action" style="background-color: pink;" @click="deletetag(tag.id)" v-else>remove</button>
        </td>
      </tr>
    </table>
    <div style="margin-top: 24px; text-align: center">
      <a @click="cleartag">Remove all tags</a>
    </div>
    <div style="margin-top: 24px; text-align: center">
      <a @click="$router.go(-1)">Back to detail</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TaskTagView',
  computed: {
    ...mapState({
      task: state => state.task.list[state.task.select],
      tags: state => state.tag.list,
    }),
    tagids: {
      get () {
        return this.$store.getters['tag/getidlist'];
      }
    },
    tasktagids: {
      get () {
        return this.$store.getters['task/gettasktagids'];
      }
    }
  },
  methods: {
    pushtag: function (idx) {
      this.$store.dispatch('task/pushtag', this.tags[idx]);
    },
    deletetag: function (tagid) {
      this.$store.dispatch('task/deletetag', tagid);
    },
    cleartag: function () {
      if (! confirm('This operation does not undone.')) return;
      this.$store.dispatch('task/cleartag');
    }
  },
  beforeMount () {
    this.$store.dispatch('task/select', this.$route.params.id);
  },
}
</script>

<style>
#tasktag-manager-table td {
  padding: 8px 0;
}

#tasktag-manager-table {
  border-collapse: collapse;
}

#tasktag-manager-table tr:nth-child(odd) {
  background-color: #fff;
}

#tasktag-manager-table tr:nth-child(even) {
  background-color: #f0f0f0;
}

#tasktag-manager-table tr td {
  border: 0;
}
</style>