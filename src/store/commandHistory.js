import commands from './commands';

const doStack = [];
const undoStack = [];

const plugin = () => (store) => {
  store.subscribeAction(({ type, payload }) => {
    if (type.substr(0, 7) !== 'COMMAND') return;
    if (!commands[type]) {
      console.warn(`${type} not implemented for undo / redo stack`);
      return;
    }

    const command = new commands[type](store, payload);
    doStack.push(command);
    command.do(store);

    // clear undoStack
    undoStack.splice(0, undoStack.length);
  });
};

const redo = (store) => {
  const cmd = undoStack.pop();
  if (cmd) {
    cmd.do(store);
    doStack.push(cmd);
  }
};

const undo = (store) => {
  const cmd = doStack.pop();
  if (cmd) {
    cmd.undo(store);
    undoStack.push(cmd);
  }
};

export { plugin, undo, redo };
