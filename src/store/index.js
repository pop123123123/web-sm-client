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
    [mutation.CHANGE_COMBO_INDEX](state, { row, newComboIndex }) {
      state.segments[row].comboIndex = newComboIndex;
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
      state.commit(mutation.CHANGE_PROJECT_NAME, newProject.name);
      state.commit(mutation.CHANGE_PROJECT_SEED, newProject.seed);
      state.commit(mutation.CHANGE_PROJECT_VIDEOS, newProject.video_urls);
    },
    [action.command.NEW_EMPTY_SENTENCE](state, index) {
      state.commit(mutation.PUSH_INDEX_EMPTY_SENTENCE, index);
    },
    [action.command.NEW_SENTENCE](state, indexList) {
      indexList.forEach((index) => {
        state.commit(mutation.PUSH_EMPTY_SENTENCE,
          {
            sentence: state.state.segments[index].sentence,
            comboIndex: state.state.segments[index].comboIndex,
          });
      });
    },
    [action.command.DELETE](state) {
      let indexOffset = 0;
      state.state.selected.forEach((id) => {
        state.commit(mutation.REMOVE, id - indexOffset);
        indexOffset += 1;
      });
      state.commit(mutation.CHANGE_SELECTED, []);
    },
    [action.CHANGE_SELECTION](state, newSelection) {
      state.commit(mutation.CHANGE_SELECTED, newSelection);
    },
    [action.COPY](state) {
      state.commit(mutation.COPY_SELECTED);
    },
    [action.PASTE](state) {
      state.dispatch(action.command.NEW_SENTENCE, state.state.clipboard);
    },
  },
  modules: {
  },
  getters: {
  },
});
