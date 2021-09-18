<template>
  <div class="settings">
    <h1>This is a setting page</h1>
    <h2>Data</h2>

    <div>
      <h3>Backup</h3>
      <div class="cleararea">
        <div class="cleararea__flex-parent">
          <div class="cleararea__flex-left">
            <p>
              <span class="inline__vertical-middle">Backup data</span>
            </p>
          </div>
          <div class="cleararea__flex-right" style="text-align: right">
            <span class="inline__vertical-middle">
              <button class="action" @click="exportdata">Export</button>
            </span>
          </div>
        </div>
      </div>
      <div class="cleararea">
        <div class="cleararea__flex-parent">
          <div class="cleararea__flex-left">
            <p>
              <span class="inline__vertical-middle">Read backup data (Comming soon)</span>
            </p>
          </div>
          <div class="cleararea__flex-right" style="text-align: right">
            <span class="inline__vertical-middle">
              <button class="action" @click="importdata">Import</button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <h3>Clear</h3>
    <div class="cleararea">
      <div class="cleararea__flex-parent">
        <div class="cleararea__flex-left">
          <p>
            <span class="inline__vertical-middle">Clear task data</span>
          </p>
        </div>
        <div class="cleararea__flex-right" style="text-align: right">
          <span class="inline__vertical-middle">
            <button class="action" @click="clearTaskData">Execute</button>
          </span>
        </div>
      </div>
    </div>
    <div class="cleararea">
      <div class="cleararea__flex-parent">
        <div class="cleararea__flex-left">
          <p>
            <span class="inline__vertical-middle">Clear all data</span>
          </p>
        </div>
        <div class="cleararea__flex-right" style="text-align: right">
          <span class="inline__vertical-middle">
            <button class="action" @click="clearAllData">Execute</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
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
      link.download = 'mytaskbu_' + String(Date.now()) + '.json'
      link.click()
    },
    importdata: function () {
      alert('Comming soon!');
    },
    clearTaskData: function () {
      if (! confirm('This operation can not be undone.')) { return; }
      this.$store.dispatch('task/clearAll');
    },
    clearAllData: function () {
      if (! confirm('This operation can not be undone.')) { return; }
      this.$store.dispatch('task/clearAll');
      this.$store.dispatch('tag/clearAll');
    }
  }
}
</script>
