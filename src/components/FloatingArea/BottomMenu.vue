<template>
  <div id="floating-bottom-menu" style="text-align: center">
    <div style="margin-top: 16px">
      <span style="font-weight: bold">Multiple selection mode</span>
    </div>
    <div style="margin: 16px auto">
      <button class="borderless round stdpadding" @click="cancel">Cancel</button>
      <button class="borderless round stdpadding primary" style="margin-left: 16px" @click="routeToMultipleTagging">Tagging</button>
      <button class="borderless round stdpadding danger" style="margin-left: 16px" @click="deleteMultipleTask">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingBottomMenu',
  methods: {
    cancel: function () {
      this.$store.dispatch('task/presentationselects', null);
    },
    routeToMultipleTagging: function () {
      this.$router.push({ name: 'MultipleTagging' });
    },
    deleteMultipleTask: function () {
      if (! confirm('Delete multiple task is never restore. [y/N]')) {
        return;
      }
      this.$store.dispatch('task/multipledelete');
    },
  }
}
</script>

<style>
#floating-bottom-menu {
  position: fixed;
  width: 512px;
  left: 50%;
  bottom: 32px;
  margin-left: -256px;
  background-color: white;
  box-shadow: 0 6px 3px 1px rgba(196, 196, 196, 0.8);
  border-radius: 3px;
}
</style>
