<template>
  <div class="main">
    <md-toolbar class="" md-elevation="1">
      <md-button class="md-primary md-raised"
        ><span class="material-icons"> add </span>New Project / Open
        Project</md-button
      >
      <md-button class="md-primary md-raised"
        ><span class="material-icons"> list </span>Action</md-button
      >
      <h3 class="md-title" style="flex: 1"></h3>
      <md-button class="md-primary md-raised"
        ><span class="material-icons"> save </span>Save</md-button
      >
      <md-button class="md-primary md-raised"
        ><span class="material-icons"> share </span>Export</md-button
      >
    </md-toolbar>

    <md-card class="md-layout-item md-size-45 md-small-size-45">
      <md-card-header>
        <div class="md-title">Title goes here</div>
      </md-card-header>
      <md-card-content>
        <md-list>
          <md-list-item
            ><md-field md-inline>
              <label>Sentence</label
              ><md-input class="md-layout-item"></md-input> </md-field
          ></md-list-item>
        </md-list>
      </md-card-content>
    </md-card>

    <md-card class="md-layout-item md-size-45 md-small-size-45">
      <md-card-header>
        <div class="md-title">Title goes here</div>
      </md-card-header>

      <md-card-media> video here </md-card-media>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {},
  data: () => ({}),
  methods: {},
};
</script>

<style lang="scss">
</style>
