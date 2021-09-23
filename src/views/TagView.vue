<template>
  <div>
    <table style="width: 80%; min-width: 640px;" id="tag-edit-table">
      <tr>
        <th>
          Tag
        </th>
        <td>
          <input type="text" v-model="tag.name" />
        </td>
      </tr>
      <tr>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagView',
  computed: {
    tag: {
      get() {
        return this.$store.getters['tag/get'];
      }
    }
  },
  methods: {
    update: function () {
      this.$store.dispatch('tag/overwritetag', this.tag);
      alert('Success!')
    }
  },
  beforeMount () {
    this.$store.dispatch('tag/select', this.$route.params.id);
  },
}
</script>

<style>
#tag-edit-table td {
  padding: 16px 0;
}
</style>