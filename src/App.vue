<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">Task</router-link> |
      <router-link to="/tags">Tag</router-link> |
      <router-link to="/settings">Setting</router-link>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount () {
    this.$store.dispatch('task/readlocalstorage');
    this.$store.dispatch('tag/readlocalstorage');
    this.$store.dispatch('task/readarchivelistlocalstorage');
  }
}
</script>

<style>
* {
  box-sizing: border-box;
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

button.borderless {
  border: 0;
}
button.wide {
  width: 256px;
}
button.round {
  border-radius: 16px;
}
button.action {
  padding: 8px 16px;
  border: 0;
  border-radius: 0;
}
button.done {
  background-color: #9FF0FF;
}
button.undone {
  background-color: #F5F5F5;
}
button.delete {
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

#app {
  width: 960px;
  margin: 0 auto;
}

#nav {
  padding: 16px;
  background-color: rgb(240, 240, 240);
  text-align: center;
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
