import Vue from 'vue';
import Vuex from 'vuex';

import mutation from './mutation-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    combos: [{ sentence: 'Bonjour', comboIndex: 2, id: 1 }],
    idListener: 1,
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
      state.combos.push({ sentence: newSentence, comboIndex: 1 });
    },
    PUSH_EMPTY_SENTENCE(state) {
      state.combos.push({ sentence: '', comboIndex: 0, id: state.idListener });
    },
    REMOVE(state, id) {
      state.combos = state.combos.filter((element) => element.id !== id);
    },
    INCREASE_LISTENER(state) {
      state.idListener += 1;
    },
  },
  actions: {
    CREATE_PROJECT(state, newProject) {
      state.commit('CHANGE_PROJECT_NAME', newProject.name);
      state.commit('CHANGE_PROJECT_SEED', newProject.seed);
      state.commit('CHANGE_PROJECT_VIDEOS', newProject.video_urls);
    },
    NEW_SENTENCE(state) {
      state.commit('INCREASE_LISTENER');
      state.commit('PUSH_EMPTY_SENTENCE');
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
