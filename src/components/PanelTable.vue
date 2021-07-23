<template>
  <div>
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
      :search="search"
      disable-sort
      fixed-header
      height="calc(100vh - 264px)"
    >
      <template slot="no-data">
        <v-btn
          @click="
            $store.dispatch(action.DELETE_PROJECT, $store.state.project.name)
          "
          >delete project
        </v-btn>
      </template>
      <template v-slot:item.element.sentence="props">
        <v-edit-dialog
          @save="save(props.item)"
          @open="editSentence = props.item.element.sentence"
        >
          {{ props.item.element.sentence }}
          <template v-slot:input>
            <v-text-field
              v-model="editSentence"
              :rules="[
                (v) =>
                  v.length <= 25 || 'Warning: Long input is not recommended',
              ]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.element.comboIndex="{ item }">
        <v-btn @click="changeComboIndex(item.index, -1)" icon>
          <v-icon>arrow_left</v-icon>
        </v-btn>
        <v-edit-dialog
          @save="saveComboIndex(item)"
          @open="editComboIndex = item.element.comboIndex"
        >
          {{ item.element.comboIndex }}
          <template v-slot:input>
            <v-text-field
              v-model="editComboIndex"
              :rules="[
                (v) =>
                 editComboIndexError,
              ]"
              label="Edit"
              single-line
            ></v-text-field>
          </template>
        </v-edit-dialog>
        <v-btn @click="changeComboIndex(item.index, 1)" icon>
          <v-icon>arrow_right</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="primary"
        @click="
          $store.dispatch(
            action.command.NEW_EMPTY_SENTENCE,
            $store.state.segments.length
          )
        "
        >Add</v-btn
      >
      <v-btn
        :disabled="$store.state.selected.length <= 0"
        class="accent"
        @click="$store.dispatch(action.command.DELETE)"
        >Delete</v-btn
      >
    </v-card-actions>
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
      editComboIndex: '',
      editComboIndexError: '',
      search: '',
      headers: [
        {
          text: 'Sentence',
          align: 'start',
          value: 'element.sentence',
        },
        {
          text: 'Index',
          value: 'element.comboIndex',
          width: '139px',
          align: 'center',
        },
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
      const newIndex = sel.item ? sel.item.index : sel.currentItem.index;
      this.$store.dispatch(action.CHANGE_SELECTION, {
        newIndex,
        modeAdd: sel.value,
      });
    },
    save(newValue) {
      this.$store.dispatch(action.command.CHANGE_SENTENCE, {
        index: newValue.index,
        newSentence: this.editSentence,
      });
    },
    saveComboIndex(newValue) {
      const editCINumber = Number(this.editComboIndex);
      if (editCINumber || editCINumber === 0) {
        this.$store.dispatch(action.command.CHANGE_COMBO_INDEX, {
          row: newValue.index,
          newComboIndex: Number(this.editComboIndex),
        });
        this.editComboIndexError = true;
      } else {
        this.editComboIndexError = 'Warning : Only numbers are accepted';
      }
    },
    onkey(event) {
      switch (event.key) {
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
        case 'c':
          if (event.ctrlKey && this.$store.state.selected.length > 0) {
            this.$store.dispatch(action.COPY);
          }
          break;
        case 'v':
          if (event.ctrlKey && this.$store.state.clipboard.length > 0) {
            this.$store.dispatch(action.PASTE);
          }
          break;
        case 'z':
          if (event.ctrlKey) {
            this.$store.dispatch(action.UNDO);
          }
          break;
        case 'y':
          if (event.ctrlKey) {
            this.$store.dispatch(action.REDO);
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
