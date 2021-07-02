<template>
  <div class="panelTable">
    {{ $store.state.segments }}
    {{ selected }}
    {{ $store.state.selected }}
    {{ $store.state.clipboard }}
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="lines"
      item-key="index"
      show-select
      :items-per-page="-1"
      :single-select="false"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:item.element.sentence="props">
        <v-edit-dialog :return-value.sync="props.item.element.sentence">
          {{ props.item.element.sentence }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.element.sentence"
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
        @click="$store.dispatch('NEW_EMPTY_SENTENCE', lines.length)"
        >Add</md-button
      >
      <md-button
        class="md-raised md-primary"
        @click="
          $store.dispatch('DELETE_SELECTED');
          selected = [];
        "
        >Delete</md-button
      >
    </md-card-actions>
  </div>
</template>

<script>
export default {
  name: 'PanelTable',
  props: {},
  components: {},
  data() {
    return {
      clipboard: [],
      search: '',
      selected: [],
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
    onkey(event) {
      switch (event.code) {
        case 'Backspace':
          if (event.ctrlKey) {
            this.$store.dispatch('DELETE_SELECTED');
            this.selected = [];
          }
          break;
        case 'Delete':
          this.$store.dispatch('DELETE_SELECTED');
          this.selected = [];
          break;
        case 'ArrowDown':
          if (event.ctrlKey) {
            this.$store.dispatch('NEW_EMPTY_SENTENCE', this.lines.length);
          }
          break;
        case 'ArrowUp':
          if (event.ctrlKey) {
            this.$store.dispatch('NEW_EMPTY_SENTENCE', 0);
          }
          break;
        case 'KeyX':
          if (event.ctrlKey && this.lines.length > 0) {
            // TODO bad indice selection
            this.selected = this.lines[this.$store.state.segments.length - 1];
            this.$store.dispatch('DELETE_SELECTED');
            this.selected = [];
          }
          break;
        case 'KeyC':
          if (event.ctrlKey && this.$store.state.selected.length > 0) {
            this.$store.dispatch('COPY');
          }
          break;
        case 'KeyV':
          if (event.ctrlKey && this.$store.state.clipboard.length > 0) {
            this.$store.dispatch('PASTE');
          }
          break;
        default:
          break;
      }
    },
    changeComboIndex(row, n) {
      if (this.$store.state.segments[row].comboIndex + n >= 0) {
        this.$store.commit('CHANGE_COMBO_INDEX', { row, n });
      }
    },
  },
  computed: {
    lines() {
      return this.$store.state.segments.map((element, index) => {
        const newElement = { element, index };
        return newElement;
      });
    },
  },
  created() {
    window.addEventListener('keydown', this.onkey);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onkey);
  },
  watch: {
    selected(newValue) {
      this.$store.dispatch(
        'CHANGE_SELECTION',
        newValue.map((element) => element.index),
      );
    },
  },
};
</script>

<style>
</style>
