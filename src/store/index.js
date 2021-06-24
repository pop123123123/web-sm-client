import Vue from 'vue';
import Vuex from 'vuex';

import mutation from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    combos: [{ sentence: 'Bonjour', index: 2 }, { sentence: 'moi', index: 4 }],
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
    ADD_SENTENCE(state, newSentence) {
      state.combos.push({ sentence: newSentence, index: 1 });
    },
    PUSH_EMPTY_SENTENCE(state) {
      state.combos.push({ sentence: 'empty', index: 0 });
    },
    REMOVE(state, index) {
      state.combos.splice(index, 1);
    },
  },
  actions: {
    CREATE_PROJECT(state, newProject) {
      state.commit('CHANGE_PROJECT_NAME', newProject.name);
      state.commit('CHANGE_PROJECT_SEED', newProject.seed);
      state.commit('CHANGE_PROJECT_VIDEOS', newProject.video_urls);
    },
    NEW_SENTENCE(state) {
      state.commit('PUSH_EMPTY_SENTENCE');
    },
    DELETE_LAST(state) {
      state.commit('REMOVE', state.state.combos.length - 1);
    },
  },
  modules: {
  },
  getters: {
  },
});
