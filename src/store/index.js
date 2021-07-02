import Vue from 'vue';
import Vuex from 'vuex';

import mutation from './mutation-types';
import action from './action-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    segments: [],
    project: {
      name: null,
      seed: null,
      video_urls: [],
    },
    menuAction: '',
    selected: [],
    clipboard: [],
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
    [mutation.PUSH_SENTENCE](state, { sentence, comboIndex }) {
      state.segments.push({ sentence, comboIndex });
    },
    [mutation.PUSH_EMPTY_SENTENCE](state) {
      state.segments.push({ sentence: '', comboIndex: 0 });
    },
    [mutation.PUSH_INDEX_EMPTY_SENTENCE](state, index) {
      state.segments.splice(index, 0, { sentence: '', comboIndex: 0 });
    },
    [mutation.REMOVE](state, index) {
      state.segments.splice(index, 1);
    },
    [mutation.CHANGE_COMBO_INDEX](state, { row, n }) {
      state.segments[row].comboIndex += n;
    },
    [mutation.CHANGE_MENU_ACTION](state, name) {
      state.menuAction = name;
    },
    [mutation.CHANGE_SELECTED](state, newSelected) {
      state.selected = newSelected;
    },
    [mutation.COPY_SELECTED](state) {
      state.clipboard = state.selected;
    },
  },
  actions: {
    [action.CREATE_PROJECT](state, newProject) {
      state.commit('CHANGE_PROJECT_NAME', newProject.name);
      state.commit('CHANGE_PROJECT_SEED', newProject.seed);
      state.commit('CHANGE_PROJECT_VIDEOS', newProject.video_urls);
    },
    [action.command.NEW_EMPTY_SENTENCE](state, index) {
      state.commit('PUSH_INDEX_EMPTY_SENTENCE', index);
    },
    [action.command.NEW_SENTENCE](state, { sentence, comboIndex }) {
      state.commit('PUSH_SENTENCE', { sentence, comboIndex });
    },
    [action.command.MULTIPLE_NEW_SENTENCE](state, indexList) {
      indexList.forEach((index) => {
        state.commit('PUSH_SENTENCE', { sentence: state.state.segments[index].sentence, comboIndex: state.state.segments[index].comboIndex });
      });
    },
    [action.command.DELETE](state, id) {
      state.commit('REMOVE', id);
    },
    [action.command.MULTIPLE_DELETE](state, indexList) {
      let indexOffset = 0;
      indexList.forEach((id) => {
        state.commit('REMOVE', id - indexOffset);
        indexOffset += 1;
      });
    },
    [action.command.DELETE_SELECTED](state) {
      if (state.state.selected.length > 1) {
        state.dispatch('MULTIPLE_DELETE', state.state.selected);
      } else {
        state.dispatch('DELETE', state.state.selected[0]);
      }
    },
    [action.CHANGE_SELECTION](state, newSelection) {
      state.commit('CHANGE_SELECTED', newSelection);
    },
    [action.COPY](state) {
      console.log('copi');
      state.commit('COPY_SELECTED');
    },
    [action.PASTE](state) {
      if (state.state.clipboard.length > 1) {
        state.dispatch('MULTIPLE_NEW_SENTENCE', state.state.clipboard);
      } else {
        state.dispatch('NEW_SENTENCE', {
          sentence: state.state.segments[state.state.clipboard[0]].sentence,
          comboIndex: state.state.segments[state.state.clipboard[0]].comboIndex,
        });
      }
    },
  },
  modules: {
  },
  getters: {
  },
});
