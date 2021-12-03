<template>
  <div id="backlog-detail-modal__background" @click="backgroundClickAction">
    <div id="backlog-detail-modal__body">
      <div style="padding: 4px 32px;" @click.stop>
        <h2>Backlog</h2>
        <div style="width: 100%">
          <table style="width: 80%; min-width: 640px;" id="backlog-detail-table">
            <tr>
              <th>Title</th>
              <td>
                <input type="text" placeholder="Title" v-model="task.name" @keydown.enter="submit" id="backlog-detail-modal-title-input" />
              </td>
            </tr>
            <tr>
              <th>Description</th>
              <td>
                <textarea style="height: 80px" disabled></textarea>
              </td>
            </tr>
            <tr>
              <th>URL</th>
              <td>
                <input type="text" placeholder="URL" disabled />
              </td>
            </tr>
          </table>

          <div style="text-align: center">
            <button class="action primary" @click="submit">Submit</button>
          </div>
        </div>
        <div style="text-align: center; margin-top: 16px">
          <span id="backlog-detail-modal__close-button" style="font-size: 13px" @click="closeModal">Close</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BacklogDetailModal',
  data () {
    return {
      task: null,
    }
  },
  methods: {
    backgroundClickAction: function () {
      this.closeModal();
    },
    closeModal: function () {
      this.$store.commit('modal/backlogDetailVisible', false);
    },
    submit: function () {
      this.$store.dispatch('backlog/update', this.task);
      this.closeModal();
    }
  },
  beforeMount () {
    this.task = JSON.parse(JSON.stringify(this.$store.getters['backlog/get']));
  },
  mounted () {
    document.getElementById('backlog-detail-modal-title-input').focus();
  }
}
</script>

<style>
#backlog-detail-modal__background {
  z-index: 1000;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(100, 100, 100, 0.5);
}

#backlog-detail-modal__body {
  z-index: 1001;
  position: absolute;
  width: 860px;
  height: 420px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: white;
  box-shadow: 0 6px 3px 1px rgba(196, 196, 196, 0.8);
  border-radius: 0;
}

#backlog-detail-modal__close-button:hover {
  cursor: pointer;
}

#backlog-detail-table td {
  padding: 16px 0;
}
</style>
