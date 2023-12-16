<template>
  <div id="floating-side-menu" style="text-align: center">
    <button class="borderless floating-side-menu__button" @click="archiveDoneTask">
      <img src="https://icongr.am/clarity/archive.svg?size=24&color=currentColor" alt="Archive done tasks" />
    </button>
    <button class="borderless floating-side-menu__button" @click="exportdata">
      <img src="https://icongr.am/clarity/export.svg?size=24&color=currentColor" alt="Export data" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'FloatingSideMenu',
  methods: {
    archiveDoneTask: function () {
      if (! confirm('Archived task are never restore. [y/N]')) {
        return;
      }
      this.$store.dispatch('task/archivedonetask');
    },
    exportdata: function () {
      let data = {
        task: this.$store.getters['task/list'],
        tag: this.$store.getters['tag/list'],
        archivetask: this.$store.getters['archivetask/list'],
        backlog: this.$store.getters['backlog/list'],
      }
      let blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'prisall_backup_' + String(Date.now()) + '.json'
      link.click()
    },
  }
}
</script>

<style>
#floating-side-menu {
  position: fixed;
  width: 64px;
  height: 128px;
  right: 32px;
  bottom: 32px;
}

button.floating-side-menu__button {
  width:48px;
  height: 48px;
  margin-top: 8px;
  padding: 8px;
  border-radius: 32px;
}
</style>