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

commands[action.command.NEW_EMPTY_SENTENCE] = class extends Command {
  constructor({ state }, index) {
    super();
    console.log(state); // TODO don't use the state
    this.index = index;
  }

  do({ state }) {
    client.send('CreateSegment', { project_name: state.project.name, segment_sentence: '', position: this.index ?? state.segments.length });
  }

  undo({ state }) {
    client.send('RemoveSegment', { project_name: state.project.name, segment_position: this.index });
  }
};

commands[action.command.CHANGE_COMBO_INDEX] = class extends Command {
  constructor({ state }, { row, newComboIndex }) {
    super();
    this.row = row;
    this.newCombo = newComboIndex;
    this.oldCombo = state.segments[row].comboIndex;
  }

  do({ state }) {
    client.send('ModifySegmentComboIndex', { project_name: state.project.name, segment_position: this.row, new_combo_index: this.newCombo });
  }

  undo({ state }) {
    client.send('ModifySegmentComboIndex', { project_name: state.project.name, segment_position: this.row, new_combo_index: this.oldCombo });
  }
};

commands[action.command.CHANGE_SENTENCE] = class extends Command {
  constructor({ state }, { index, newSentence }) {
    super();
    this.index = index;
    this.newSentence = newSentence;
    this.oldSentence = state.segments[index].sentence;
  }

  do({ state }) {
    client.send('ModifySegmentSentence', {
      project_name: state.project.name,
      segment_position: this.index,
      new_sentence: this.newSentence,
    });
  }

  undo({ state }) {
    client.send('ModifySegmentSentence', {
      project_name: state.project.name,
      segment_position: this.index,
      new_sentence: this.oldSentence,
    });
  }
};

commands[action.command.DUPLICATE_SENTENCE] = class extends Command {
  constructor({ state }, indexList) {
    super();
    this.indexList = indexList;
    console.log(state);
  }

  do({ state }) {
    this.indexList.sort((a, b) => a - b);
    this.indexList.forEach((indexElement, index) => {
      client.send('CreateSegment',
        {
          project_name: state.project.name,
          segment_sentence: state.segments[indexElement].sentence,
          position: state.segments.length + index,
        });
      client.send('ModifySegmentComboIndex', { project_name: state.project.name, segment_position: state.segments.length + index, new_combo_index: state.segments[indexElement].comboIndex });
    });
  }

  undo({ state }) {
    this.indexList.forEach((indexElement, index) => client.send('RemoveSegment', { project_name: state.project.name, segment_position: state.segments.length - index - 1 }));
  }
};
export default commands;
