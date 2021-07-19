<template>
  <div class="panelTable">
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :value="selected"
      hide-default-footer
      @item-selected="onItemSelected"
      @toggle-select-all="selectAll"
      :headers="headers"
      :items="lines"
      item-key="index"
      show-select
      :items-per-page="-1"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:item.element.sentence="props">
        <v-edit-dialog
          @save="save(props.item)"
          @open="editSentence = props.item.element.sentence"
        >
          {{ props.item.element.sentence }}
          <template v-slot:input>
            <v-text-field
              v-model="editSentence"
              :rules="[(v) => v.length <= 25 || 'Warning: Long input is not recommended']"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.element.comboIndex="{ item }">
        <v-btn @click="changeComboIndex(item.index, -1)" elevation="1" x-small
          >&lt;</v-btn
        >
        {{ item.element.comboIndex }}
        <v-btn @click="changeComboIndex(item.index, 1)" elevation="1" x-small
          >&gt;</v-btn
        >
      </template>
    </v-data-table>

    <md-card-actions>
      <md-button
        class="md-raised md-primary"
        @click="$store.dispatch(action.command.NEW_EMPTY_SENTENCE,$store.state.segments.length)"
        >Add</md-button
      >
      <md-button
        :disabled="$store.state.selected.length <= 0"
        class="md-raised md-primary"
        @click="$store.dispatch(action.command.DELETE)"
        >Delete</md-button
      >
    </md-card-actions>
  </div>
</template>

<script>
import action from '@/store/action-types';

export default {
  name: 'PanelTable',
  props: {},
  components: {},
  data() {
    return {
      action,
      editSentence: '',
      search: '',
      headers: [
        {
          text: 'Sentence',
          align: 'start',
          value: 'element.sentence',
        },
        { text: 'Index', value: 'element.comboIndex', width: '139px' },
      ],
    };
  },
  methods: {
    selectAll(all) {
      all.items.forEach((item) => {
        if (!all.value || !this.$store.state.selected.includes(item.index)) {
          this.$store.dispatch(action.CHANGE_SELECTION, {
            newIndex: item.index,
            modeAdd: all.value,
          });
        }
      });
    },
    onItemSelected(sel) {
      this.$store.dispatch(action.CHANGE_SELECTION, {
        newIndex: sel.item.index,
        modeAdd: sel.value,
      });
    },
    save(newValue) {
      this.$store.dispatch(action.command.CHANGE_SENTENCE, {
        index: newValue.index,
        newSentence: this.editSentence,
      });
    },
    onkey(event) {
      switch (event.code) {
        case 'Backspace':
          if (event.ctrlKey) {
            this.$store.dispatch(action.command.DELETE);
          }
          break;
        case 'Delete':
          this.$store.dispatch(action.command.DELETE);
          break;
        case 'ArrowDown':
          if (event.ctrlKey) {
            this.$store.dispatch(
              action.command.NEW_EMPTY_SENTENCE,
              this.lines.length,
            );
          }
          break;
        case 'ArrowUp':
          if (event.ctrlKey) {
            this.$store.dispatch(action.command.NEW_EMPTY_SENTENCE, 0);
          }
          break;
        case 'KeyC':
          if (event.ctrlKey && this.$store.state.selected.length > 0) {
            this.$store.dispatch(action.COPY);
          }
          break;
        case 'KeyV':
          if (event.ctrlKey && this.$store.state.clipboard.length > 0) {
            this.$store.dispatch(action.PASTE);
          }
          break;
        default:
          break;
      }
    },
    changeComboIndex(row, n) {
      const actualComboIndex = this.$store.state.segments[row].comboIndex;
      if (actualComboIndex + n >= 0) {
        this.$store.dispatch(action.command.CHANGE_COMBO_INDEX, {
          row,
          newComboIndex: actualComboIndex + n,
        });
      }
    },
  },
  computed: {
    lines() {
      return this.$store.state.segments.map((element, index) => ({
        element,
        index,
      }));
    },
    selected() {
      return this.$store.state.selected.map((element) => this.lines[element]);
    },
  },
  created() {
    window.addEventListener('keydown', this.onkey);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onkey);
  },
  watch: {},
};
</script>

<style>
</style>
