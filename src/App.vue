<template>
  <div id="app">
    <header id="nav">
      <div id="nav__inside">
        <table style="width: 100%">
          <tr>
            <td>
              <router-link :to="{ name: 'Home' }" style="text-decoration: none; color: black">
                <h1 style="font-size: 16px; margin: 0">mytask</h1>
              </router-link>
            </td>
            <td style="text-align: right">
              <router-link :to="{ name: 'Home' }" style="text-decoration: none; color: black">Home</router-link>
              <router-link :to="{ name: 'Settings' }" style="text-decoration: none; color: black; margin-left: 16px">Setting</router-link>
            </td>
          </tr>
        </table>
      </div>
    </header>
    <div id="main">
      <router-view/>
      <floating-side-menu />
    </div>
  </div>
</template>

<script>
import FloatingSideMenu from './components/FloatingSideMenu.vue';

export default {
  name: 'App',
  components: {
    FloatingSideMenu,
  },
  beforeMount () {
    this.$store.dispatch('featureEnabled/read');
    this.$store.dispatch('task/readlocalstorage');
    this.$store.dispatch('tag/readlocalstorage');
    this.$store.dispatch('archivetask/read');
    this.$store.dispatch('backlog/read');
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: rgb(250, 250, 250);
  overflow-y: scroll;
}

p {
  margin: 0;
}

button:hover {
  cursor: pointer;
}

input[type="text"] {
  width: 100%;
  padding: 4px 8px;
}

textarea {
  resize: none;
  width: 100%;
  padding: 4px 8px;
}

span.tag {
  padding: 4px 8px;
  border-radius: 16px;
  background-color: lightgray;
  font-size: 13px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

span.tagfilter {
  background-color: #fff;
  border: 1px solid lightgray;
}

span.tagfilter:hover {
  background-color: lightblue;
  border: 1px solid lightblue;
  cursor: pointer;
}

span.tagfilterused {
  background-color: lightskyblue;
  border: 1px solid lightskyblue;
}

span.tagfilterused:hover {
  cursor: pointer;
}

button.std {
  padding: 8px 16px;
  border: 0;
}
button.borderless {
  border: 0;
}
button.wide {
  width: 256px;
}
button.antisquare {
  border-radius: 3px;
}
button.round {
  border-radius: 16px;
}
button.stdpadding {
  padding: 8px 16px;
}
button.action {
  padding: 8px 16px;
  border: 0;
  border-radius: 0;
}
button.primary {
  background-color: royalblue;
  color: white;
}
button.secondary {
  background-color: lightgray;
  color: black;
}
button.danger {
  background-color: crimson;
  color: white;
}
button.done {
  background-color: #9FF0FF;
}
button.undone {
  background-color: #F5F5F5;
}
button.delete:hover {
  background-color: #FF99CC;
}

label.btn {
  cursor: pointer;
}
label.borderless {
  border: 0;
}
label.round {
  border-radius: 16px;
}
label.action {
  padding: 8px 16px;
  border: 0;
  border-radius: 0;
}
label.color-default {
  background-color: rgb(239, 239, 239);
}

#main {
  width: 960px;
  margin: 0 auto;
  /* padding: 16px; */
  margin-top: 32px;
  margin-bottom: 256px;
  /* background-color: white; */
}

#nav {
  width: 100%;
  height: 64px;
  padding: 16px;
  background-color: white;
  border-bottom: 1px solid rgb(225, 225, 225);
}

#nav__inside {
  width: 960px;
  margin: 0 auto;
}

.inline__vertical-middle {
  height: 100%;
  vertical-align: middle;
}

.tasklist_task {
  margin-top: 8px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
}

.tasklist_task_selected {
  background-color: rgb(224, 255, 255);
}

.tasklist_task_done {
  background-color: rgb(240, 240, 240);
}

.tasklist_flexparent {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.flex-state {
  flex-basis: 5%;
}
.flex-name {
  flex-basis: 50%;
}
.flex-tag {
  flex-basis: 30%;
}
.flex-operate {
  flex-basis: 15%;
}

.taglist_tag {
  margin-top: 8px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
}
.tag__flex-parent {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.tag__flex-name {
  flex-basis: 80%;
}
.tag__flex-operate {
  flex-basis: 20%;
}

.cleararea {
  margin-top: 8px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
}
.cleararea__flex-parent {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.cleararea__flex-left {
  flex-basis: 80%;
}
.cleararea__flex-right {
  flex-basis: 20%;
}
</style>
