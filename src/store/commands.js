/* eslint max-classes-per-file: 0 */
import action from './action-types';
import { client } from '../socket';

const commands = {};

const classError = (method, o) => {
  const className = (Object.keys(commands).find((n) => o instanceof commands[n]));
  throw new Error(`"${method}" method not implemented for ${className}`);
};

class Command {
  do() {
    classError('do', this);
  }

  undo() {
    classError('undo', this);
  }
}

commands[action.command.DELETE] = class extends Command {
  constructor({ state }) {
    super();
    this.selected = [...state.selected];
    this.selected.sort((a, b) => a - b);
    this.removed = this.selected.map((i) => ({ ...state.segments[i] }));
  }

  do({ state }) {
    this.selected.slice().reverse().forEach((id) => {
      client.send('RemoveSegment', { project_name: state.project.name, segment_position: id });
    });
  }

  undo({ state }) {
    this.selected.forEach((index, i) => {
      const seg = this.removed[i];
      client.send('CreateSegment',
        {
          project_name: state.project.name,
          segment_sentence: seg.sentence,
          position: index,
        });
      client.send('ModifySegmentComboIndex', {
        project_name: state.project.name,
        segment_position: index,
        new_combo_index: seg.comboIndex,
      });
    });
  }
};

export default commands;
