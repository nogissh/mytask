import Vue from 'vue'
import VueRouter from 'vue-router'
import TasksView from '../views/TasksView.vue'
import TaskView from '../views/TaskView.vue'
import TagsView from '../views/TagsView.vue'
import TagView from '../views/TagView.vue'
import TaskTagView from '../views/TaskTagView.vue'
import SettingsView from '../views/SettingsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TasksView
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TasksView
  },
  {
    path: '/tasks/:id',
    name: 'Task',
    component: TaskView
  },
  {
    path: '/tasks/:id/tag',
    name: 'TaskTag',
    component: TaskTagView
  },
  {
    path: '/tags',
    name: 'Tags',
    component: TagsView
  },
  {
    path: '/tags/:id',
    name: 'Tag',
    component: TagView
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
