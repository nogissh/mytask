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
      conds: {
        tagids: [],
        done: true,
      }
    },
    archive: {
      list: []
    }
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
    gettasktagids: state => {
      return state.list[state.select].tags.map(tag => tag.id);
    },
    archivelist: state => {
      return state.archive.list;
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
    delete: function (state, id) {
      state.list = state.list.filter(task => task.id != id);
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
    archivelist: function (state, list) {
      state.archive.list = list;
    },
    cleararchivelist: function (state) {
      state.archive.list = [];
    },
  },
  actions: {
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
      var archivetasks = getters['archivelist'];
      var newarchivetasks = getters.list.filter(task => task.done == false);
      var donetasks = getters.list.filter(task => task.done == true);
      commit('overwrite', newarchivetasks);
      commit('archivelist', archivetasks.concat(donetasks))
      dispatch('presentationlist');
      dispatch('persistarchivelistlocalstrage');
    },
    persistarchivelistlocalstrage ({ getters }) {
      window.localStorage.setItem('archivedtasks', JSON.stringify(getters.archivelist));
    },
    readarchivelistlocalstorage ({ commit }) {
      let list = JSON.parse(window.localStorage.getItem('archivedtasks'));
      if (list == null) {
        list = [];
      }
      commit('archivelist', list);
    },
    clearAll ({ commit, dispatch }) {
      commit('clearconds');
      commit('clear');
      commit('clearselect');
      commit('cleararchivelist');
      dispatch('persistlocalstrage');
      dispatch('persistarchivelistlocalstrage');
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

export default new Vuex.Store({
  modules: {
    task,
    tag
  }
});
