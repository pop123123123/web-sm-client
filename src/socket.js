const socket = new WebSocket(`ws://${window.location.host
}/ws/`);

const plugin = () => (store) => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.debug('WebSocket message received:', data);
    if (data.Err) throw data.Err;
    const [mutation, argument] = Object.entries(data)[0];
    if (mutation !== 'Ok') { store.commit(mutation, argument); }
  };
};

const client = {
  send(type, payload) {
    socket.send(JSON.stringify({ [type]: payload }));
  },
};

export { plugin, client };
