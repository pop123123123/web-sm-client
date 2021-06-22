import Vue from 'vue';
import Vuex from 'vuex';

import mutation from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projectName: null,
    projectSeed: null,
    videoChips: [],
    loadFile: null,

  },
  mutations: {
    [mutation.CHANGE_PROJECT_NAME](state, newName) {
      state.projectName = newName;
    },
    [mutation.CHANGE_PROJECT_SEED](state, newSeed) {
      state.projectSeed = newSeed;
    },
    [mutation.CHANGE_PROJECT_VIDEOS](state, newVIDEOS) {
      state.videoChips = newVIDEOS;
    },
    [mutation.CHANGE_LOAD_FILE](state, newFile) {
      state.loadFile = newFile;
    },
  },
  actions: {
    CHANGE_PROJECT(state, newProject) {
      state.commit('CHANGE_PROJECT_NAME', newProject.Name);
      state.commit('CHANGE_PROJECT_SEED', newProject.Seed);
      state.commit('CHANGE_PROJECT_VIDEOS', newProject.Videos);
    },
  },
  modules: {
  },
  getters: {
  },
});
