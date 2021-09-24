import Vue from 'vue'
import Vuex from 'vuex'

import { intersection } from './utils.js';

Vue.use(Vuex);


const task = {
  namespaced: true,
  state: {
    list: [],
    select: null,
    presentation: {
      mode: false,
      list: [],
      selects: [],
      conds: {
        tagids: [],
        done: true,
      }
    },
  },
  getters: {
    getTask: state => {
      return state.list[state.select];
    },
    list: state => {
      return state.list;
    },
    get: state => {
      return state.list[state.select];
    },
    gets: state => {
      return state.list.filter(task => state.presentation.selects.indexOf(task.id) != -1);
    },
    gettasktagids: state => {
      return state.list[state.select].tags.map(tag => tag.id);
    },
    presentationlist: state => {
      return state.presentation.list;
    },
    presentationselects: state => {
      return state.presentation.selects;
    },
  },
  mutations: {
    overwrite: function (state, list) {
      state.list = list;
    },
    clear: function (state) {
      state.list = [];
    },
    clearselect: function (state) {
      state.select = null;
    },
    clearconds: function (state) {
      state.presentation.mode = false;
      state.presentation.conds = { tagids: [], done: true };
    },
    overwritetask: function (state, task) {
      state.list[state.select] = task;
    },
    push: function (state, task) {
      state.list.push(task);
    },
    unshift: function (state, task) {
      state.list.unshift(task);
    },
    delete: function (state, ids) {
      if (typeof(ids) == 'number') {
        ids = [ids];
      }
      state.list = state.list.filter(task => ids.indexOf(task.id) == -1);
    },
    select: function (state, idx) {
      state.select = idx;
    },
    done: function (state, idx) {
      state.list[idx].done = true;
    },
    undone: function (state, idx) {
      state.list[idx].done = false;
    },
    pushtag: function (state, tag) {
      state.list[state.select].tags.push(tag);
    },
    deletetag: function (state, tagid) {
      state.list[state.select].tags = state.list[state.select].tags.filter(tag => tag.id != tagid);
    },
    presentationmode: function (state, status) {
      state.presentation.mode = status;
    },
    presentationlist: function (state) {
      var _list = state.list;
      if (state.presentation.conds.tagids.length > 0) {
        _list = _list.filter(task => {
          let condset = new Set(state.presentation.conds.tagids);
          let tasktagset = new Set(task.tags.map(tag => tag.id));
          let interset = intersection(condset, tasktagset);
          return condset.size == interset.size;
        });
      }
      if (state.presentation.conds.done == false) {
        _list = _list.filter(task => task.done == false);
      }
      state.presentation.list = _list;
    },
    presentationselects: function (state, taskid) {
      if (taskid == null) {
        state.presentation.selects = [];
        return;
      }
      let index = state.presentation.selects.indexOf(taskid);
      if (index < 0) {
        state.presentation.selects.push(taskid);
      } else {
        state.presentation.selects.splice(index, 1);
      }
    },
    presentationcondstagids: function (state, tagid) {
      if (tagid == null) {
        state.presentation.conds.tagids = [];
      } else {
        let index = state.presentation.conds.tagids.indexOf(tagid);
        if (index < 0) {
          state.presentation.conds.tagids.push(tagid);
        } else {
          state.presentation.conds.tagids.splice(index, 1);
        }
      }
    },
    presentationcondsdone: function (state, status) {
      state.presentation.conds.done = status;
    },
  },
  actions: {
    overwrite ({ commit, dispatch }, tasks) {
      commit('overwrite', tasks);
      dispatch('persistlocalstrage');
    },
    overwritetask ({ commit, dispatch }, task) {
      commit('overwritetask', task);
      dispatch('persistlocalstrage');
    },
    push ({ commit, dispatch }, _task) {
      commit('push', _task);
      dispatch('presentationlist');
    },
    unshift ({ commit, dispatch }, _task) {
      commit('unshift', _task);
      dispatch('presentationlist');
    },
    delete ({ commit, dispatch }, id) {
      commit('delete', id);
      dispatch('presentationlist');
    },
    select ({ state, commit }, id) {
      let _ids = state.list.map(task => String(task.id));
      let _id = _ids.indexOf(String(id));
      commit('select', _id);
    },
    done ({ state, commit, dispatch }, id) {
      dispatch('select', id);
      commit('done', state.select);
      dispatch('presentationlist');
    },
    undone ({ state, commit, dispatch }, id) {
      dispatch('select', id);
      commit('undone', state.select);
      dispatch('presentationlist');
    },
    pushtag ({ commit, dispatch }, tag) {
      commit('pushtag', tag);
      dispatch('presentationlist');
    },
    deletetag ({ commit, dispatch }, tagid) {
      commit('deletetag', tagid);
      dispatch('presentationlist');
    },
    presentationselects ({ commit, dispatch }, taskid) {
      commit('presentationselects', taskid);
      dispatch('presentationlist');
    },
    multipledelete ({ getters, commit, dispatch }) {
      commit('delete', getters.presentationselects);
      commit('presentationselects', null);
      dispatch('presentationlist');
    },
    multipletagging ({ getters, dispatch }, tags) {
      let selectedTasks = getters.gets;
      selectedTasks.forEach(task => {
        dispatch('select', task.id);
        tags.forEach(tag => {
          dispatch('pushtag', tag);
        })
      })
      dispatch('presentationlist');
    },
    presentationcondstagids ({ state, commit, dispatch }, tagid) {
      commit('presentationcondstagids', tagid);
      if (state.presentation.conds.tagids.length > 0) {
        commit('presentationmode', true);
      } else {
        if (state.presentation.conds.done == false) {
          commit('presentationmode', true);
        } else {
          commit('presentationmode', false);
        }
      }
      dispatch('presentationlist');
    },
    presentationlist ({ commit, dispatch }) {
      commit('presentationlist');
      dispatch('persistlocalstrage');
    },
    persistlocalstrage ({ getters }) {
      window.localStorage.setItem('tasks', JSON.stringify(getters.list));
    },
    readlocalstorage ({ commit }) {
      let list = JSON.parse(window.localStorage.getItem('tasks'));
      if (list == null) {
        list = [];
      }
      commit('overwrite', list);
    },
    draggablesort ({ commit, dispatch }, list) {
      commit('overwrite', list);
      dispatch('persistlocalstrage');
    },
    hidedonetask ({ commit, dispatch }) {
      commit('presentationmode', true);
      commit('presentationcondsdone', false);
      dispatch('presentationlist');
    },
    showdonetask ({ state, commit, dispatch }) {
      if (state.presentation.conds.tagids.length > 0) {
        commit('presentationmode', true);
      } else {
        commit('presentationmode', false);
      }
      commit('presentationcondsdone', true);
      dispatch('presentationlist');
    },
    archivedonetask ({ getters, commit, dispatch }) {
      var newarchivetasks = getters.list.filter(task => task.done == false);
      var donetasks = getters.list.filter(task => task.done == true);
      commit('overwrite', newarchivetasks);
      dispatch('presentationlist');
      dispatch('archivetask/concat', donetasks, { root: true });
      dispatch('archivetask/persist', null, { root: true });
    },
    clearAll ({ commit, dispatch }) {
      commit('clearconds');
      commit('clear');
      commit('clearselect');
      dispatch('persistlocalstrage');
      dispatch('presentationlist');
    },
  }
}

const tag = {
  namespaced: true,
  state: {
    list: [],
    select: null,
  },
  getters: {
    list: state => {
      return state.list;
    },
    get: state => {
      return state.list[state.select];
    },
    getidlist: state => {
      return state.list.map(tag => tag.id);
    }
  },
  mutations: {
    overwrite: function (state, list) {
      state.list = list;
    },
    clear: function (state) {
      state.list = [];
    },
    clearselect: function (state) {
      state.select = null;
    },
    overwritetag: function (state, tag) {
      state.list[state.select] = tag;
    },
    add: function (state, tag) {
      state.list.push(tag);
    },
    delete: function (state, id) {
      state.list = state.list.filter(tag => tag.id != id);
    },
    select: function (state, idx) {
      state.select = idx;
    },
  },
  actions: {
    add ({ commit, dispatch }, state) {
      commit('add', state);
      dispatch('persistlocalstrage');
    },
    delete ({ commit, dispatch }, id) {
      commit('delete', id);
      dispatch('persistlocalstrage');
    },
    select ({ state, commit }, id) {
      let _ids = state.list.map(tag => String(tag.id));
      let _id = _ids.indexOf(String(id));
      commit('select', _id);
    },
    overwrite ({ commit, dispatch }, tags) {
      commit('overwrite', tags);
      dispatch('persistlocalstrage');
    },
    overwritetag ({ commit, dispatch }, tag) {
      commit('overwritetag', tag);
      dispatch('persistlocalstrage');
    },
    persistlocalstrage ({ getters }) {
      window.localStorage.setItem('tags', JSON.stringify(getters.list));
    },
    readlocalstorage ({ commit }) {
      let list = JSON.parse(window.localStorage.getItem('tags'));
      if (list == null) {
        list = [];
      }
      commit('overwrite', list);
    },
    draggablesort ({ commit, dispatch }, list) {
      commit('overwrite', list);
      dispatch('persistlocalstrage');
    },
    clearAll ({ commit, dispatch }) {
      commit('clear');
      commit('clearselect');
      dispatch('persistlocalstrage');
    }
  }
}

const archivetask = {
  namespaced: true,
  state: {
    list: [],
  },
  getters: {
    list: function (state) {
      return state.list;
    }
  },
  mutations: {
    list: function (state, list) {
      state.list = list;
    }
  },
  actions: {
    overwrite ({ commit, dispatch }, list) {
      commit('list', list);
      dispatch('persist');
    },
    concat ({ getters, commit, dispatch }, newList) {
      let list = getters.list;
      commit('list', list.concat(newList));
      dispatch('persist');
    },
    clear ({ commit, dispatch }) {
      commit('list', []);
      dispatch('persist');
    },
    persist ({ getters }) {
      window.localStorage.setItem('archivetasks', JSON.stringify(getters.list));
    },
    read ({ commit }) {
      let list = JSON.parse(window.localStorage.getItem('archivetasks'));
      if (list == null) {
        list = [];
      }
      commit('list', list);
    },
  }
}

export default new Vuex.Store({
  modules: {
    task,
    tag,
    archivetask,
  }
});
