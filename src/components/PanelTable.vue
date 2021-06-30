<template>
  <div class="table">
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
      :items-per-page="12"
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
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.element.comboIndex="{ item }">
        <v-btn
          @click="increaseComboIndex(item.index, -1)"
          elevation="1"
          x-small
          >{{ left }}</v-btn
        >
        {{ item.element.comboIndex }}
        <v-btn
          @click="increaseComboIndex(item.index, 1)"
          elevation="1"
          x-small
          >{{ right }}</v-btn
        >
      </template>
    </v-data-table>

    <md-card-actions>
      <md-button class="md-raised md-primary" @click="newSentence"
        >Add</md-button
      >
      <md-button class="md-raised md-primary" @click="remove">Delete</md-button>
      <!-- <md-button v-else class="md-raised md-primary" disabled
            >Delete</md-button
          > -->
    </md-card-actions>
  </div>
</template>

<script>

export default {
  name: 'PanelTable',
  props: {},
  components: {
  },
  data() {
    return {
      clipboard: [],
      search: '',
      filteredSearch: this.$store.state.combos,
      selected: [],
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      right: '>',
      left: '<',
      headers: [
        {
          text: 'Sentence',
          align: 'start',
          value: 'element.sentence',
        },
        { text: 'Index', value: 'element.comboIndex' },
      ],
    };
  },
  methods: {
    newSentence() {
      this.$store.dispatch('NEW_SENTENCE');
    },
    newManySentences() {
      this.$store.dispatch('NEW_SENTENCE');
    },
    remove() {
      let indexOffset = 0;
      this.selected.forEach((element) => {
        this.$store.dispatch('DELETE', element.index - indexOffset);
        indexOffset += 1;
      });
      this.selected = [];
    },

    onkey(event) {
      // console.log(event);
      if ((event.ctrlKey && event.code === 'Backspace') || event.code === 'Delete') {
        this.remove();
      }
      if (event.ctrlKey && event.code === 'ArrowDown') {
        this.newSentence();
      }
      if (event.ctrlKey && event.code === 'ArrowUp') {
        // TODO new sentence from top ?
      }
      if (event.code === 'ArrowUp' && this.selected.length === 1 && this.selected.index > 0) {
        // TODO swap to lines ?
      }
      if (event.ctrlKey && event.code === 'KeyX' && this.lines.length > 0) {
        this.selected = [this.lines[this.$store.state.combos.length - 1]];
        this.remove();
      }
      if (event.ctrlKey && event.code === 'KeyC' && this.selected.length > 0) {
        this.clipboard = this.selected;
      }
      if (event.ctrlKey && event.code === 'KeyV' && this.clipboard.length > 0) {
        this.clipboard = this.selected;
        this.clipboard.forEach((element) => this.$store.dispatch('NEW_SENTENCE_NON_EMPTY', { sentence: element.element.sentence, comboIndex: element.element.comboIndex }));
      }
    },
    increaseComboIndex(index, n) {
      if (!(n === -1 && this.$store.state.combos[index].comboIndex === 0)) {
        this.$store.commit('CHANGE_COMBO_INDEX', { index, n });
      }
    },
  },
  computed: {
    lines() {
      return this.$store.state.combos.map((element, index) => {
        let newElement = {};
        newElement = { element, index };
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
};
</script>

<style>
</style>