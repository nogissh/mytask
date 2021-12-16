import Vue from 'vue'
import VueRouter from 'vue-router'
import TasksView from '../views/TasksView.vue'
import TaskView from '../views/TaskView.vue'
import TagView from '../views/TagView.vue'
import SettingsView from '../views/SettingsView.vue'
import MultipleTaggingView from '../views/MultipleTaggingView.vue'
import BacklogDeploymentView from '../views/BacklogDeploymentView.vue';
import ArchiveTasksView from '../views/ArchiveTasksView.vue'

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
    path: '/tags/:id',
    name: 'Tag',
    component: TagView
  },
  {
    path: '/multipletagging',
    name: 'MultipleTagging',
    component: MultipleTaggingView
  },
  {
    path: '/backlog/:id/deployment',
    name: 'BacklogDeployment',
    component: BacklogDeploymentView,
  },
  {
    path: '/archivetasks',
    name: 'ArchiveTasksView',
    component: ArchiveTasksView
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
