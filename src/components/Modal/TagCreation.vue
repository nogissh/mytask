<template>
  <div id="tag-creation-modal_background" @click="backgroundClickAction">
    <div id="tag-creation-modal_body">
      <div style="padding: 4px 32px;" @click.stop>
        <h2>Create tag</h2>
        <div>
          <input type="text" placeholder="Enter tag name" v-model="name" style="width: 320px; padding: 4px; font-size: 16px" />
          <button class="action primary" style="margin-left: 8px" @click="submit">Add</button>
        </div>
        <div style="text-align: center; margin-top: 16px">
          <span id="tag-creation-modal__close-button" style="font-size: 13px" @click="closeModal">Close</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNewTag } from '../../utils.js';

export default {
  name: 'TagCreationModal',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    visible: {
      get () {
        return this.$store.getters['modal/tagCreationVisible'];
      }
    }
  },
  methods: {
    backgroundClickAction: function () {
      this.closeModal();
    },
    submit: function () {
      this.$store.dispatch('tag/add', createNewTag(Date.now(), this.name));
      this.$store.commit('modal/tagCreationVisible', false);
    },
    closeModal: function () {
      this.$store.commit('modal/tagCreationVisible', false);
    }
  }
}
</script>

<style>
#tag-creation-modal_background {
  z-index: 1000;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(100, 100, 100, 0.5);
}

#tag-creation-modal_body {
  z-index: 1001;
  position: fixed;
  width: 640px;
  height: 160px;
  top: 40%;
  left: 50%;
  margin-left: -320px;
  background-color: white;
  box-shadow: 0 6px 3px 1px rgba(196, 196, 196, 0.8);
  border-radius: 0;
}

#tag-creation-modal__close-button:hover {
  cursor: pointer;
}
</style>
