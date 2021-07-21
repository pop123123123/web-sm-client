<template>
  <div>
    <ProjectPopUp v-if="showPopup" @closed="showPopup = false" />
    <v-row justify="space-between">
      <v-col>
        <v-card>
          <v-card-title>
            <div>{{ $store.state.project.name }}</div>
          </v-card-title>
          <v-card-text>
            <div>Seed:{{ $store.state.project.seed }}</div>
            <PanelTable />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Preview </v-card-title>
          <Video />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Video from '@/components/Video.vue';
import PanelTable from '@/components/PanelTable.vue';
import ProjectPopUp from '@/components/ProjectPopUp.vue';

export default {
  name: 'Panel',
  props: {},
  components: {
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
  computed: {},
};
</script>

<style lang="scss">
</style>
