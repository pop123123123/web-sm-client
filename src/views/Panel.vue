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
          <PanelTable/>
        </md-card-content>

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
import PanelTable from '@/components/PanelTable.vue';

export default {
  name: 'Panel',
  props: {},
  components: {
    Video,
    Menu,
    PanelTable,
  },
  data() {
    return {
    };
  },
  methods: {

  },
};
</script>

<style lang="scss">
.delete {
  background-color: grey;
}
</style>
