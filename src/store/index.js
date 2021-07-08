import Vue from 'vue';
import Vuex from 'vuex';

import mutation from './mutation-types';
import action from './action-types';

function selectionOffset(state, targetIndex, modeAdd) {
  if (state.selected.length > 0) {
    state.selected.forEach((element, index) => {
      if (targetIndex <= element) {
        state.selected[index] += (modeAdd * 2 - 1);
      }
    });
  }
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    segments: [],
    project: {
      name: null,
      seed: null,
      video_urls: [],
    },
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
    [mutation.NEW_SENTENCE](state, { element: { sentence, comboIndex }, index }) {
      state.segments.splice(index, 0, { sentence, comboIndex });
      selectionOffset(state, index, 1);
    },
    [mutation.REMOVE](state, index) {
      state.segments.splice(index, 1);
      selectionOffset(state, index, 0);
    },
    [mutation.CHANGE_COMBO_INDEX](state, { row, newComboIndex }) {
      state.segments[row].comboIndex = newComboIndex;
    },
    [mutation.ADD_SELECTED](state, newSelected) {
      state.selected.push(newSelected);
    },
    [mutation.REMOVE_SELECTED](state, index) {
      state.selected.splice(index, 1);
    },
    [mutation.RESET_SELECTED](state) {
      state.selected = [];
    },
    [mutation.COPY_SELECTED](state) {
      state.clipboard = [];
      state.selected.forEach((element) => state.clipboard.push(element));
    },
    [mutation.CHANGE_SENTENCE](state, { index, newSentence }) {
      state.segments[index].sentence = newSentence;
    },
  },
  actions: {
    [action.CREATE_PROJECT]({ commit }, newProject) {
      commit(mutation.CHANGE_PROJECT_NAME, newProject.name);
      commit(mutation.CHANGE_PROJECT_SEED, newProject.seed);
      commit(mutation.CHANGE_PROJECT_VIDEOS, newProject.video_urls);
    },
    [action.command.NEW_EMPTY_SENTENCE](context, index) {
      context.commit(mutation.NEW_SENTENCE, { element: { sentence: '', comboIndex: 0 }, index });
    },
    [action.command.NEW_SENTENCE](context, indexList) {
      indexList.forEach((index) => {
        context.commit(mutation.NEW_SENTENCE, {
          element: {
            sentence: context.state.segments[index].sentence,
            comboIndex: context.state.segments[index].comboIndex,
          },
          index: context.state.segments.length,
        });
      });
    },
    [action.command.DELETE]({ commit, state }) {
      state.selected.forEach((id, index) => {
        commit(mutation.REMOVE, id - index);
      });
      commit(mutation.RESET_SELECTED);
    },
    [action.CHANGE_SELECTION]({ commit, state }, { newIndex, modeAdd }) {
      if (modeAdd) {
        commit(mutation.ADD_SELECTED, newIndex);
      } else {
        commit(
          mutation.REMOVE_SELECTED,
          state.selected.findIndex((element) => element === newIndex),
        );
      }
    },
    [action.COPY]({ commit }) {
      commit(mutation.COPY_SELECTED);
    },
    [action.PASTE](context) {
      context.dispatch(action.command.NEW_SENTENCE, context.state.clipboard);
    },
    [action.command.CHANGE_COMBO_INDEX]({ commit }, { row, newComboIndex }) {
      commit(mutation.CHANGE_COMBO_INDEX, { row, newComboIndex });
    },
    [action.command.CHANGE_SENTENCE]({ commit }, { index, newSentence }) {
      commit(mutation.CHANGE_SENTENCE, { index, newSentence });
    },
  },
  modules: {
  },
  getters: {
  },
});
