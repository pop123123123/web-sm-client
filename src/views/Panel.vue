<template>
  <md-app md-mode="reveal">
    <md-app-drawer></md-app-drawer>
    <md-app-toolbar class="" md-elevation="1">
      <md-button class="md-primary md-raised"
        >New Project / Open Project</md-button
      >
      <Menu name="Action" />
      <h3 class="md-title" style="flex: 1"></h3>
      <md-button class="md-primary md-raised">Save</md-button>
      <md-button class="md-primary md-raised">Export</md-button>
    </md-app-toolbar>

    <md-app-content class="md-layout">
      <!-- TODO menu déroulant -->
      <md-card class="md-layout-item md-size-45 md-small-size-45">
        <md-card-header>
          <div class="md-title">Title goes here</div>
        </md-card-header>
        <md-card-content>
          {{$store.state.combos}}
          {{ selected }}
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
        </md-card-content>
        <md-card-actions>
          <md-button class="md-raised md-primary" @click="newSentence"
            >Add</md-button
          >
          <md-button
            v-if="selected"
            class="md-raised md-primary"
            @click="remove"
            >Delete</md-button
          >
          <md-button v-else class="md-raised md-primary" disabled
            >Delete</md-button
          >
        </md-card-actions>
      </md-card>

      <md-card class="md-layout-item md-size-45 md-small-size-45">
        <md-card-header>
          <div class="md-title">Title goes here</div>
        </md-card-header>

        <md-card-media> <Video /> </md-card-media>
      </md-card>
    </md-app-content>
  </md-app>
</template>

<script>
import Video from '@/components/Video.vue';
import Menu from '@/components/Menu.vue';

export default {
  name: 'Panel',
  props: {},
  components: {
    Video,
    Menu,
  },
  data() {
    return {
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
    remove() {
      let indexOffset = 0;
      this.selected.forEach((element) => {
        this.$store.dispatch('DELETE', element.index - indexOffset);
        indexOffset += 1;
      });
      this.selected = [];
    },
    onkey(event) {
      if (event.code === 'Delete' || event.code === 'BackSpace') {
        this.remove();
      }
      if (event.code === 'KeyN') {
        this.newSentence();
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

<style lang="scss">
.delete {
  background-color: grey;
}
</style>
