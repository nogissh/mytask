<template>
  <div>
    <div style="width: 100%; margin-top: 16px;">
      <input type="text" placeholder="Enter new tag name" v-model="form.tag.name" @keydown.enter="add" style="width: 200px; margin-right: 8px;" />
      <button class="action" @click="add">add</button>
    </div>

    <div>
      <tag-list />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { createNewTag } from '../utils.js';

import TagList from '@/components/TagList.vue';

export default {
  name: 'TagContainer',
  components: {
    TagList
  },
  data () {
    return {
      form: {
        tag: {
          name: ''
        }
      }
    }
  },
  computed: {
    ...mapState({
      tagList: state => state.tag.list,
    })
  },
  methods: {
    add: function (e) {
      if (e.keyCode == 229) return;
      if (this.form.tag.name == '') { return; }
      this.$store.dispatch('tag/add', createNewTag(Date.now(), this.form.tag.name));
      this.form.tag.name = '';
    }
  }
}
</script>

<style>

</style>