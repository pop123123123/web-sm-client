import Vue from 'vue';
import Vuex from 'vuex';

import mutation from './mutation-types';
import action from './action-types';
import { client, plugin as socketPlugin } from '../socket';

function offsetSelection(state, targetIndex, modeAdd) {
  state.selected.forEach((element, index) => {
    if (targetIndex <= element) {
      state.selected[index] += (modeAdd * 2 - 1);
    }
  });
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    segments: [],
    project: {
      name: null,
      seed: null,
      videoUrls: [],
    },
    selected: [],
    clipboard: [],
    projects: [],
    users: [],
    socketError: '',
  },
  mutations: {
    [mutation.CHANGE_PROJECT_NAME](state, newName) {
      state.project.name = newName;
    },
    [mutation.CHANGE_PROJECT_SEED](state, newSeed) {
      state.project.seed = newSeed;
    },
    [mutation.CHANGE_PROJECT_VIDEOS](state, newVIDEOS) {
      state.project.videoUrls = newVIDEOS;
    },
    [mutation.NEW_SEGMENT](state, { segment: { s, i }, row }) {
      state.segments.splice(row, 0, { sentence: s, comboIndex: i });
      offsetSelection(state, row, 1);
    },
    [mutation.REMOVE_SEGMENT](state, index) {
      state.segments.splice(index, 1);
      state.selected = state.selected.filter((element) => element !== index);
      offsetSelection(state, index, 0);
    },
    [mutation.CHANGE_COMBO_INDEX](state, { row, comboIndex }) {
      state.segments[row].comboIndex = comboIndex;
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
    [mutation.CHANGE_SENTENCE](state, { row, sentence }) {
      state.segments[row].sentence = sentence;
    },
    [mutation.CHANGE_PROJECT](state, { // The server will only calls this one on creation
      seed, videoUrls, name, segments,
    }) {
      state.project.seed = seed;
      state.project.name = name;
      state.project.videoUrls = videoUrls;
      state.segments = segments.map(({ s, i }) => ({ sentence: s, comboIndex: i }));
    },
    [mutation.USER_JOINED_PROJECT](state, user) {
      state.users.push(user);
    },
    [mutation.USER_LEFT_PROJECT](state, user) {
      Vue.set(state, 'users', state.users.filter((u) => u !== user));
    },
    [mutation.CHANGE_LIST_PROJECTS](state, { projects }) {
      Vue.set(state, 'projects', projects);
    },
    [mutation.CHANGE_SOCKET_ERROR](state, error) {
      state.socketError = error;
    },
  },
  actions: {
    [action.CREATE_PROJECT](context, newProject) {
      client.send('CreateProject', { project_name: newProject.name, seed: newProject.seed, urls: newProject.videoUrls });
    },
    [action.command.NEW_EMPTY_SENTENCE](context, index) {
      client.send('CreateSegment', { project_name: context.state.project.name, segment_sentence: '', position: index ?? context.state.segments.length });
    },
    [action.command.DUPLICATE_SENTENCE](context, indexList) {
      indexList.forEach((index) => {
        context.commit(mutation.NEW_SEGMENT, { //
          segment: {
            s: context.state.segments[index].sentence,
            i: context.state.segments[index].comboIndex,
          }, //
          row: context.state.segments.length, //
        }); //
        // TODO Use the server's command to duplicate lines
      });
    },
    [action.command.DELETE]({ commit, state }) {
      state.selected.sort((a, b) => a - b);
      state.selected.forEach((id, index) => {
        commit(mutation.REMOVE_SEGMENT, id - index);
        // client.send('RemoveSegment', { project_name: state.project.name, position: id - index });
      });
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
      context.dispatch(action.command.DUPLICATE_SENTENCE, context.state.clipboard);
    },
    [action.command.CHANGE_COMBO_INDEX]({ commit }, { row, newComboIndex }) {
      commit(mutation.CHANGE_COMBO_INDEX, { row, comboIndex: newComboIndex });
      // Todo send to the server an action
    },
    [action.command.CHANGE_SENTENCE]({ state }, { index, newSentence }) {
      client.send('ModifySegmentSentence', {
        project_name: state.project.name,
        segment_position: index,
        new_sentence: newSentence,
      });
    },
    [action.LIST_PROJECTS]() {
      client.send('ListProjects');
    },
    [action.DELETE_PROJECT](context, projectName) { // unused for now
      client.send('DeleteProject', { project_name: projectName });
    },
    [action.JOIN_PROJECT](context, projectName) { // unused for now
      client.send('JoinProject', { project_name: projectName });
    },
    [action.CHANGE_SOCKET_ERROR]({ commit }, error) {
      commit(mutation.CHANGE_SOCKET_ERROR, error);
    },
  },
  modules: {
  },
  getters: {
  },
  plugins: [socketPlugin()],
});
