const action = {
  CREATE_PROJECT: 'CREATE_PROJECT',
  CHANGE_SELECTION: 'CHANGE_SELECTION',
  COPY: 'COPY',
  PASTE: 'PASTE',
  LIST_PROJECTS: 'LIST_PROJECTS',
  DELETE_PROJECT: 'DELETE_PROJECT',
  JOIN_PROJECT: 'JOIN_PROJECT',
  CHANGE_SOCKET_ERROR: 'CHANGE_SOCKET_ERROR',
  UNDO: 'UNDO',
  REDO: 'REDO',
  MAKE_ACTIVE: 'MAKE_ACTIVE',
  command: {
    NEW_EMPTY_SENTENCE: 'COMMAND_NEW_EMPTY_SENTENCE',
    DUPLICATE_SENTENCE: 'COMMAND_DUPLICATE_SENTENCE',
    DELETE: 'COMMAND_DELETE',
    CHANGE_COMBO_INDEX: 'COMMAND_CHANGE_COMBO_INDEX',
    CHANGE_SENTENCE: 'COMMAND_CHANGE_SENTENCE',
  },
};
export default action;
