<template>
  <div>
    <div v-if="loading">
      Loading project...
    </div>
    <v-row v-else justify="space-between">
      <v-col>
        <v-card>
          <v-card-text>
            <div>Seed:{{ $store.state.project.seed }}</div>
            <div>
              Other users connected : {{ $store.state.users.length}}
            </div>
            <PanelTable />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card style="height: 100%">
          <v-card-title> Preview </v-card-title>
          <Video/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import action from '@/store/action-types';

import Video from '@/components/Video.vue';
import PanelTable from '@/components/PanelTable.vue';

export default {
  name: 'ProjectEditor',
  components: {
    Video,
    PanelTable,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    loading() {
      return !this.$store.state.project.loaded;
    },
  },
  mounted() {
    this.$store.dispatch(action.JOIN_PROJECT, this.id);
  },
};
</script>

<style lang="scss">
</style>
