import Vue from 'vue';
import Vuex from 'vuex';

import mutation from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    combos: [{ sentence: 'Bonjour', comboIndex: 2 }],
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
    PUSH_SENTENCE(state, { sentence, comboIndex }) {
      state.combos.push({ sentence, comboIndex });
    },
    PUSH_EMPTY_SENTENCE(state) {
      state.combos.push({ sentence: '', comboIndex: 0 });
    },
    REMOVE(state, index) {
      state.combos.splice(index, 1);
    },
    CHANGE_COMBO_INDEX(state, { index, n }) {
      state.combos[index].comboIndex += n;
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
    NEW_SENTENCE_NON_EMPTY(state, { sentence, comboIndex }) {
      state.commit('PUSH_SENTENCE', { sentence, comboIndex });
    },
    DELETE(state, id) {
      state.commit('REMOVE', id);
    },
  },
  modules: {
  },
  getters: {
  },
});
