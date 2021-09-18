<template>
  <div class="settings">
    <h1>This is a setting page</h1>
    <h2>Data</h2>
    <div class="cleararea">
      <div class="cleararea__flex-parent">
        <div class="cleararea__flex-left">
          <p>
            <span class="inline__vertical-middle">Clear task data</span>
          </p>
        </div>
        <div class="cleararea__flex-right">
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
        <div class="cleararea__flex-right">
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
