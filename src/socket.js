import action from '@/store/action-types';
import { save } from '@/utils/storage';

const socket = new WebSocket(`ws://${window.location.host}/ws/`);

const projectMutations = [
  'NEW_SEGMENT',
  'REMOVE_SEGMENT',
  'CHANGE_COMBO_INDEX',
  'CHANGE_SENTENCE',
  'CHANGE_PROJECT',
];

// messages to send when socket becomes open
const messageQueue = [];

const plugin = () => (store) => {
  socket.onopen = () => {
    while (messageQueue.length > 0) {
      socket.send(messageQueue.shift());
    }
    store.dispatch(action.LIST_PROJECTS);
  };
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.debug('WebSocket message received:', data);
      if (data.Err) { store.dispatch(action.CHANGE_SOCKET_ERROR, data.Err); }
      const [mutation, argument] = Object.entries(data)[0];
      if (mutation !== 'Ok' && mutation !== 'Err') { store.commit(mutation, argument); }
      if (projectMutations.includes(mutation)) save(store.state.project);
    } catch (err) {
      console.error(event.data);
    }
  };
  socket.onerror = (event) => {
    console.error('socket error:', event);
  };
};

const client = {
  send(type, payload) {
    const message = JSON.stringify({ [type]: payload ?? null });

    if (socket.readyState !== 1) {
      messageQueue.push(message);
    } else {
      socket.send(message);
    }
  },
};

export { plugin, client };
