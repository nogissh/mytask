<template>
  <div class="settings">
    <h1>Settings</h1>

    <div v-if="notificationPermission != 'granted'">
      <h2>Notification</h2>
      <div class="cleararea">
        <div class="cleararea__flex-parent">
          <div class="cleararea__flex-left">
            <p>
              <span class="inline__vertical-middle">Desktop notification</span>
            </p>
          </div>
          <div class="cleararea__flex-right" style="text-align: right">
            <span class="inline__vertical-middle">
              <a @click="desktopNotificationRequest">Request</a>
            </span>
          </div>
        </div>
      </div>
    </div>  

    <h2>Data</h2>
    <div>
      <h3>Backup</h3>
      <div class="cleararea">
        <div class="cleararea__flex-parent">
          <div class="cleararea__flex-left">
            <p>
              <span class="inline__vertical-middle">Download backup data</span>
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
              <span class="inline__vertical-middle">Restoration from backup data</span>
            </p>
          </div>
          <div class="cleararea__flex-right" style="text-align: right">
            <span class="inline__vertical-middle">
              <label class="btn action color-default" for="backup-file-uploader" style="font-size: 13px; font-weight: 400">
                <input type="file" style="display: none" id="backup-file-uploader" @change="importdata">Import
              </label>
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
  name: 'SettingsView',
  data () {
    return {
      notificationPermission: window.Notification.permission,
    }
  },
  methods: {
    desktopNotificationRequest: function () {
      Notification.requestPermission(function (result) {
        switch (result) {
          case 'granted':
            alert('Thanks, desktop notification is enabled.');
            new Notification('Do you see desktop notification?');
            break;
          case 'denied':
            alert('If you want to use notification, you can be enable on setting page.');
            break;
          default:
            break;          
        }
      });
    },
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
    importdata: function (event) {
      let reader = new FileReader()
      let file = event.target.files[0]
      let type = file.type
      if (type != 'application/json') {
        alert('Invalid data format.');
        event.currentTarget.value = ''
        return;
      }
      reader.onload = () => {
        let data = JSON.parse(reader.result);
        this.$store.dispatch('task/overwrite', data.task);
        this.$store.dispatch('task/overwritearchivelist', data.archivetask);
        this.$store.dispatch('tag/overwrite', data.tag);
        alert('Welcome back!!!');
      };
      reader.readAsText(file);
    },
    clearTaskData: function () {
      if (! confirm('This operation can not be undone.')) { return; }
      this.$store.dispatch('task/clearAll');
      alert('Task data cleared.')
    },
    clearAllData: function () {
      if (! confirm('This operation can not be undone.')) { return; }
      this.$store.dispatch('task/clearAll');
      this.$store.dispatch('tag/clearAll');
      alert('All data cleared.')
    }
  }
}
</script>
