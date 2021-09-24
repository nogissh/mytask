<template>
  <div id="floating-bottom-menu" style="text-align: center">
    <button class="borderless round stdpadding fbm" @click="cancel">Cancel select</button>
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

button.fbm {
  margin: 16px;
}
</style>
