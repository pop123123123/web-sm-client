<template>
  <md-app md-mode="reveal">
    <md-app-drawer></md-app-drawer>
    <md-app-toolbar class="" md-elevation="1">
      <md-button class="md-primary md-raised"
        >New Project / Open Project</md-button
      >
      <md-button class="md-primary md-raised">Action</md-button>
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

          <md-table
            v-model="$store.state.ComboTab"
            md-sort="name"
            md-sort-order="asc"
            md-card
            md-fixed-header
          >
            <md-table-toolbar>
              <div class="md-toolbar-section-start">
                <h1 class="md-title">Sentences</h1>
              </div>
              <md-field md-clearable class="md-toolbar-section-end">
                <md-input
                  placeholder="Search by name..."
                  v-model="search"
                  @input="searchOnTable"
                />
                <!-- TODO réparer le search -->
              </md-field>
            </md-table-toolbar>

            <md-table-empty-state md-label="Nothing here">
              <md-button class="md-primary md-raised" @click="newSentence"
                >Create new sentence</md-button
              >
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Sentence" md-sort-by="sentence">{{
                item.sentence
              }}</md-table-cell>
              <md-table-cell md-label="Index" md-sort-by="index" md-numeric>{{
                item.index
              }}</md-table-cell>
            </md-table-row>

          </md-table>
        </md-card-content>
      </md-card>

      <md-card class="md-layout-item md-size-45 md-small-size-45">
        <md-card-header>
          <div class="md-title">Title goes here</div>
        </md-card-header>

        <md-card-media> video here </md-card-media>
      </md-card>
    </md-app-content>
  </md-app>
</template>

<script>
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
  data: () => ({
    search: null,
    searched: [],
  }),
  methods: {
    newSentence() {

    },
    searchOnTable() {
      this.searched = searchByName(this.$store.state.ComboTab, this.search);
    },
  },
};
</script>

<style lang="scss">
</style>
