<template>
  <div class="home">
    <md-dialog :md-active.sync="popUp">
      <md-tabs md-dynamic-height md-alignment="fixed">
        <md-tab md-label="Create">
          <CreateForm />
        </md-tab>

        <md-tab md-label="Load">
          <LoadTab />
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary">Close</md-button>
        <md-button class="md-primary" @click="validationProject()"
          >Start</md-button
        >
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-accent md-raised" @click="popUp = true"
      >See Popup</md-button
    >
  </div>
</template>

<script>
// TODO Changer en form
// TODO Changer la structure du tempoNames
// TODO Mettre les commits dans une action
// TODO Faire que le pop-up ne puisse pas se quitter tt le temps
import CreateForm from '@/components/CreateTab.vue';
import LoadTab from '@/components/LoadTab.vue';

export default {
  name: 'ProjectPopUp',
  components: {
    CreateForm,
    LoadTab,
  },
  data: () => ({
    popUp: false,
    tempoName: '',
    tempoSeed: '',
    initial: '',
    file: null,
  }),
  methods: {
    validationProject() {
      if (this.file) {
        this.loadFile();
      } else {
        this.popUp = false;
        this.$store.commit('CHANGE_PROJECT_NAME', this.tempoName);
        this.$store.commit('CHANGE_PROJECT_SEED', this.tempoSeed);
        console.log(this.tempoName);
        console.log(this.tempoSeed);
        console.log(this.$store.state.videoChips);
      }
    },
    loadFile() {
      console.log(this.$store.state.loadFile);
      // this.$store.dispatch('GET_DATA_FROM_FILE',this.$store.state.loadFile)
    },
  },
};
</script>

<style lang="scss">
.shake-on-error .md-duplicated {
  animation-name: shake;
  animation-duration: 0.5s;
}

@keyframes shake {
  0% {
    transform: translate(15px);
  }
  20% {
    transform: translate(-15px);
  }
  40% {
    transform: translate(7px);
  }
  60% {
    transform: translate(-7px);
  }
  80% {
    transform: translate(3px);
  }
  100% {
    transform: translate(0px);
  }
}
</style>
