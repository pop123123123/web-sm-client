import Vue from 'vue';
import Vuex from 'vuex';

import { base64toBlob } from '@/utils/base64';
import mutation from './mutation-types';
import action from './action-types';
import { client, plugin as socketPlugin } from '../socket';
import { undo, redo, plugin as commandsPlugin } from './commandHistory';

function offsetSelection(state, targetIndex, modeAdd) {
  state.selected.forEach((element, index) => {
    if (targetIndex <= element) {
      state.selected[index] += (modeAdd * 2 - 1);
    }
  });
}

function hashSegments(segments) {
  return segments.reduce((acc, { sentence, comboIndex }) => `${acc}${sentence}${comboIndex}`, '');
}

function save(filename, blob) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
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
    previews: {},
    renders: {},
    lastPreview: [],
    selected: [],
    clipboard: [],
    projects: [],
    users: [],
    socketError: '',
    active: null,
    videoComponent: undefined,
    rendering: null,
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
      if (state.active >= row) state.active += 1;
    },
    [mutation.REMOVE_SEGMENT](state, { row }) {
      state.segments.splice(row, 1);
      state.selected = state.selected.filter((element) => element !== row);
      offsetSelection(state, row, 0);
      if (state.active > row) state.active -= 1;
      if (state.active === row) state.active = null;
    },
    [mutation.CHANGE_COMBO_INDEX](state, { row, comboIndex }) {
      state.segments[row].comboIndex = comboIndex;
    },
    [mutation.ADD_SELECTED](state, newSelected) {
      const index = state.selected.findIndex((element) => element > newSelected);
      state.selected.splice(index === -1 ? state.selected.length : index, 0, newSelected);
    },
    [mutation.REMOVE_SELECTED](state, index) {
      state.selected.splice(index, 1);
    },
    [mutation.RESET_SELECTED](state) {
      state.selected = [];
    },
    [mutation.SELECT_ACTIVE](state) {
      state.selected = state.active == null ? [] : [state.active];
    },
    [mutation.COPY_SELECTED](state) {
      state.clipboard = [];
      state.selected.forEach((element) => state.clipboard.push(element));
    },
    [mutation.CHANGE_SENTENCE](state, { row, sentence }) {
      state.segments[row].sentence = sentence;
    },
    [mutation.CHANGE_PROJECT](state, {
      seed, videoUrls, name, segments,
    }) {
      state.project.seed = seed;
      state.project.name = name;
      state.project.videoUrls = videoUrls;
      state.segments = segments.map(({ s, i }) => ({ sentence: s, comboIndex: i }));
    },
    [mutation.USER_JOINED_PROJECT](state, { user }) {
      state.users.push(user);
    },
    [mutation.USER_LEFT_PROJECT](state, { user }) {
      Vue.set(state, 'users', state.users.filter((u) => u !== user));
    },
    [mutation.CHANGE_LIST_PROJECTS](state, { projects }) {
      Vue.set(state, 'projects', projects);
    },
    [mutation.CHANGE_SOCKET_ERROR](state, error) {
      state.socketError = error;
    },
    [mutation.NEW_PROJECT](state, newProject) {
      state.projects.push(newProject);
    },
    [mutation.REMOVE_PROJECT](state, { name }) {
      state.projects = state.projects.filter((project) => project.name !== name);
    },
    [mutation.JOINED_USERS](state, { users }) {
      state.users = users;
    },
    [mutation.ADD_ACTIVE](state, childIndex) {
      state.active = childIndex;
    },
    [mutation.PREVIEW](state, { s: sentence, i: comboIndex, data }) {
      if (!(sentence in state.previews)) {
        state.previews[sentence] = {};
      }
      state.previews[sentence][comboIndex] = base64toBlob(data, 'video/webm');
      state.lastPreview = [{ sentence, comboIndex }];
      state.videoComponent?.startPreview();
    },
    [mutation.PREVIEW_SEGMENTS](state, segmentsIndices) {
      state.lastPreview = segmentsIndices.map((i) => ({ ...state.segments[i] }));
      state.videoComponent?.startPreview();
      // if (!state.previews[hash]) {
      //   state.lastPreview = hash;
      // }
    },
    [mutation.WAIT_FOR_RENDER](state) {
      const hash = hashSegments(state.segments);
      if (!state.renders[hash]) { state.rendering = hash; }
    },
    [mutation.RENDER_RESULT](state, { hash, data }) {
      state.renders[hash] = base64toBlob(data, 'video/webm');
      if (hash === state.rendering) {
        save(`${state.project.name}.webm`, state.renders[hash]);
      }
    },
    [mutation.WAIT_FOR_RENDER](state) {
      const hash = hashSegments(state.segments);
      if (!state.renders[hash]) { state.rendering = hash; }
    },
    [mutation.RENDER_RESULT](state, { hash, data }) {
      state.renders[hash] = base64toBlob(data, 'video/webm');
      if (hash === state.rendering) {
        save(`${state.project.name}.webm`, state.renders[hash]);
      }
    },
  },
  actions: {
    [action.CREATE_PROJECT](context, newProject) {
      client.send('CreateProject', { project_name: newProject.name, seed: newProject.seed, urls: newProject.videoUrls });
    },
    [action.command.NEW_EMPTY_SENTENCE]() {
    },
    [action.command.DUPLICATE_SENTENCE]() {
    },
    [action.command.DELETE]() {
    },
    [action.CHANGE_SELECTION]({ commit, state }, { newIndex, modeAdd }) {
      if (modeAdd) {
        if (!state.selected.includes(newIndex)) { commit(mutation.ADD_SELECTED, newIndex); }
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
    [action.command.CHANGE_COMBO_INDEX]() {
    },
    [action.command.CHANGE_SENTENCE]() {
    },
    [action.EXPORT]({ state, commit }) {
      commit(mutation.WAIT_FOR_RENDER);
      client.send('Export', { project_name: state.project.name });
    },
    [action.LIST_PROJECTS]() {
      client.send('ListProjects');
    },
    [action.DELETE_PROJECT](context, projectName) {
      client.send('DeleteProject', { project_name: projectName });
    },
    [action.JOIN_PROJECT](context, projectName) {
      client.send('JoinProject', { project_name: projectName });
    },
    [action.CHANGE_SOCKET_ERROR]({ commit }, error) {
      commit(mutation.CHANGE_SOCKET_ERROR, error);
    },
    [action.UNDO]: undo,
    [action.REDO]: redo,
    [action.MAKE_ACTIVE]({ commit }, childIndex) {
      commit(mutation.ADD_ACTIVE, childIndex);
    },
    [action.PREVIEW_ACTIVE]({ state, commit }) {
      commit(mutation.PREVIEW_SEGMENTS, state.selected);
    },
  },
  modules: {
  },
  getters: {
    getPreview(state) {
      return (index) => {
        if (state.lastPreview.length < 1) return undefined;
        const { sentence, comboIndex } = state.lastPreview[index ?? 0];
        if (!state.previews[sentence] || state.previews[sentence][comboIndex] === undefined) {
          // TODO: request preview
          return undefined;
        }
        return state.previews[sentence][comboIndex];
      };
    },
  },
  plugins: [socketPlugin(), commandsPlugin()],
});
