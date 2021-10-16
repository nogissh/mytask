<template>
  <div>
    <table style="width: 80%; min-width: 640px;" id="tag-edit-table">
      <tr>
        <th>
          Tag
        </th>
        <td>
          <input type="text" v-model="tag.name" @keydown.enter="update" />
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
      <p style="font-size: 10px; margin-top: 8px">Tags that are already tagged will not be renamed.</p>
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
    update: function (e) {
      if (e.keyCode == 229) return;
      if (this.tag.name == '') return;
      this.$store.dispatch('tag/overwritetag', this.tag);
      this.$router.push({ name: 'Settings' });
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