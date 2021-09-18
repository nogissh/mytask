import Vue from 'vue'
import VueRouter from 'vue-router'
import Tasks from '../views/Tasks.vue'
import Task from '../views/Task.vue'
import Tags from '../views/Tags.vue'
import Tag from '../views/Tag.vue'
import TaskTag from '../views/TaskTag.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Tasks
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/tasks/:id',
    name: 'Task',
    component: Task
  },
  {
    path: '/tasks/:id/tag',
    name: 'TaskTag',
    component: TaskTag
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/tags/:id',
    name: 'Tag',
    component: Tag
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
