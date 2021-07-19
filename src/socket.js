import action from '@/store/action-types';

const socket = new WebSocket(`ws://${window.location.host}/ws/`);

const plugin = () => (store) => {
  socket.onopen = () => {
    store.dispatch(action.LIST_PROJECTS);
  };
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.debug('WebSocket message received:', data);
      if (data.Err) { store.dispatch(action.CHANGE_SOCKET_ERROR, data.Err); }
      const [mutation, argument] = Object.entries(data)[0];
      if (mutation !== 'Ok' && mutation !== 'Err') { store.commit(mutation, argument); }
    } catch (err) {
      console.error(event.data);
    }
  };
};

const client = {
  send(type, payload) {
    socket.send(JSON.stringify({ [type]: payload ?? null }));
  },
};

export { plugin, client };
