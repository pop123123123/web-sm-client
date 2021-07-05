<template>
  <md-app md-mode="reveal">
    <md-app-drawer></md-app-drawer>
    <md-app-toolbar class="" md-elevation="1">
      <md-button class="md-primary md-raised" @click="showPopup = true;"
        >New Project / Open Project</md-button>
<Menu name="Action" />
      <h3 class="md-title" style="flex: 1"></h3>
      <md-button class="md-primary md-raised">Save</md-button>
      <md-button class="md-primary md-raised">Export</md-button>
    </md-app-toolbar>

    <md-app-content class="md-layout">
      <ProjectPopUp v-if="showPopup" @closed="showPopup = false"></ProjectPopUp>
      <md-card class="md-layout-item md-size-45 md-small-size-45">
        <md-card-header>
          <div class="md-title">{{ $store.state.project.name }}</div>
            <div class="md-subhead">Seed:{{ $store.state.project.seed }}</div>
        </md-card-header>
        <md-card-content>
          <PanelTable />
        </md-card-content>
      </md-card>

      <md-card class="md-layout-item md-size-45 md-small-size-45">
        <md-card-header>
          <div class="md-title">Preview</div>
        </md-card-header>

        <md-card-media> <Video /> </md-card-media>
      </md-card>
    </md-app-content>
  </md-app>
</template>

<script>
import Video from '@/components/Video.vue';
import PanelTable from '@/components/PanelTable.vue';
import ProjectPopUp from '@/components/ProjectPopUp.vue';
import Menu from '@/components/Menu.vue';

export default {
  name: 'Panel',
  props: {},
  components: {
    Menu,
    Video,
    PanelTable,
    ProjectPopUp,
  },
  data() {
    return {
      showPopup: false,
    };
  },
  methods: {},
  computed: {

  },
};
</script>

<style lang="scss">
</style>
