import Vue from 'vue';
import Vuex from 'vuex';

import mutation from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    project: {
      name: null,
      seed: null,
      video_urls: [],
    },

  },
  mutations: {
    [mutation.CHANGE_PROJECT_NAME](state, newName) {
      state.project.name = newName;
    },
    [mutation.CHANGE_PROJECT_SEED](state, newSeed) {
      state.project.seed = newSeed;
    },
    [mutation.CHANGE_PROJECT_VIDEOS](state, newVIDEOS) {
      state.project.video_urls = newVIDEOS;
    },
  },
  actions: {
    CREATE_PROJECT(state, newProject) {
      state.commit('CHANGE_PROJECT_NAME', newProject.name);
      state.commit('CHANGE_PROJECT_SEED', newProject.seed);
      state.commit('CHANGE_PROJECT_VIDEOS', newProject.video_urls);
    },
  },
  modules: {
  },
  getters: {
  },
});
