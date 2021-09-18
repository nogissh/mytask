<template>
  <div>
    <draggable v-model="tags">
      <div v-for="tag in tags" :key="tag.id" class="taglist_tag">
        <div class="tag__flex-parent">
          <div class="tag__flex-name">
            <span style="height: 100%; vertical-align: middle;">
              <router-link :to="`/tags/${ tag.id }`">{{ tag.name }}</router-link>
            </span>
          </div>
          <div class="tag__flex-operate" style="text-align: right">
            <button @click="deltag(tag.id)" class="action delete">Delete</button>
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TagList',
  components: {
    draggable
  },
  computed: {
    tags:{
      get() {
        return this.$store.getters['tag/list'];
      },
      set(val) {
        this.$store.dispatch('tag/draggablesort', val);
      }
    }
  },
  methods: {
    deltag: function (id) {
      if (! confirm('Deleted tag are never restore. [y/N]')) {
        return;
      }
      this.$store.dispatch('tag/delete', id);
    }
  },
}
</script>

<style>

</style>
