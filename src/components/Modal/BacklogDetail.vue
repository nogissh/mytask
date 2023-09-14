<template>
  <div id="backlog-detail-modal__background" @click="backgroundClickAction">
    <div id="backlog-detail-modal__container">
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
                  <textarea style="height: 80px" v-model="task.description"></textarea>
                </td>
              </tr>
              <tr>
                <th>URL</th>
                <td>
                  <input type="text" placeholder="URL" v-model="task.reference" />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div id="backlog-detail-modal__footer" @click.stop>
        <div style="margin-top: 12px; text-align: center">
          <button class="action secondary" @click="closeModal">Cancel</button>
          <button class="action primary" style="margin-left: 8px" @click="submit">Save</button>
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
    submit: function (e) {
      if (e.keyCode == 229) return;
      if (this.task.name == '') return;
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

#backlog-detail-modal__container {
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
  border-radius: 0;
}

#backlog-detail-modal__body {
  width: 100%;
  height: 360px;
  overflow-y: scroll;
}

#backlog-detail-modal__footer {
  width: 100%;
  height: 60px;
  border-top: 1px lightgray solid;
}

#backlog-detail-modal__close-button:hover {
  cursor: pointer;
}

#backlog-detail-table td {
  padding: 16px 0;
}
</style>
