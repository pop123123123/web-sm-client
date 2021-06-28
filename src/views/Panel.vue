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
          {{selected}}
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="lines"
            show-select
            :single-select="false"
            class="elevation-1"
          ></v-data-table>
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

const toLower = (text) => text.toString().toLowerCase();

const searchByName = (items, term) => {
  if (term) {
    return items.filter((item) => toLower(item.sentence).includes(toLower(term)));
  }

  return items;
};
export default {
  name: 'Panel',
  props: {},
  components: {
    Video,
    Menu,
  },
  data() {
    return {
      search: null,
      filteredSearch: this.$store.state.combos,
      selected: [],
      headers: [
        {
          text: 'Sentence',
          align: 'start',
          value: 'sentence',
        },
        { text: 'Index', value: 'comboIndex' },
      ],
    };
  },
  methods: {
    newSentence() {
      this.$store.dispatch('NEW_SENTENCE');
    },
    searchOnTable() {
      this.filteredSearch = searchByName(this.$store.state.combos, this.search);
    },
    remove() {
      this.selected.forEach((element) => {
        this.$store.dispatch('DELETE', element.id);
      });
      this.selected = [];
      this.filteredSearch = this.$store.state.combos;
    },
    onkey(event) {
      if (event.code === 'Delete' || event.code === 'BackSpace') {
        this.remove();
      }
      if (event.code === 'Enter') {
        this.newSentence();
      }
    },
  },
  computed: {
    lines() {
      return this.$store.state.combos;
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
