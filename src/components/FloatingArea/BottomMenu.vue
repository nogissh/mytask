<template>
  <div id="floating-bottom-menu" style="text-align: center">
    <div style="margin-top: 16px">
      Multiple selection mode
    </div>
    <div style="margin: 16px auto">
      <button class="borderless round stdpadding" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingBottomMenu',
  methods: {
    cancel: function () {
      this.$store.dispatch('task/presentationselects', null);
    }
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
