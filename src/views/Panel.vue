<template>
  <div>
    <v-row justify="space-between">
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
import Video from '@/components/Video.vue';
import PanelTable from '@/components/PanelTable.vue';

export default {
  name: 'Panel',
  components: {
    Video,
    PanelTable,
  },
};
</script>

<style lang="scss">
</style>
