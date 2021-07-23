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
        <v-card>
          <v-card-title> Preview </v-card-title>
          <Video :sentence="videoSentence" :comboIndex="videoComboIndex" />
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
  computed: {
    videoSentence() {
      return this.$store.state.lastPreview.sentence;
    },
    videoComboIndex() {
      return this.$store.state.lastPreview.comboIndex ?? 0;
    },
  },
};
</script>

<style lang="scss">
</style>
