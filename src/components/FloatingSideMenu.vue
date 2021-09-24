<template>
  <div id="floating-side-menu" style="text-align: center">
    <button class="borderless floating-side-menu__download" @click="exportdata">Export</button>
  </div>
</template>

<script>
export default {
  name: 'FloatingSideMenu',
  methods: {
    exportdata: function () {
      let data = {
        task: this.$store.getters['task/list'],
        tag: this.$store.getters['tag/list'],
        archivetask: this.$store.getters['task/archivelist'],
      }
      let blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'mytask_backup_' + String(Date.now()) + '.json'
      link.click()
    },
  }
}
</script>

<style>
#floating-side-menu {
  position: fixed;
  width: 96px;
  height: 64px;
  right: 32px;
  bottom: 32px;
}

button.floating-side-menu__download {
  padding: 16px;
  background-color: lightgray;
}
button.floating-side-menu__download:hover {
  background-color: gray;
  color: white;
}
</style>