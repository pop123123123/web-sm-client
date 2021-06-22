<template>
  <div class="home">
    <md-dialog :md-active.sync="popUp">
      <md-tabs class="overTabs" md-dynamic-height md-alignment="fixed">
        <md-tab md-label="Create">
          <md-field >
        <label>Project's Name</label>
          <md-input md-input required v-model="tempoName"></md-input>
        </md-field>
          <md-field >
        <label>Seed</label>
          <md-input md-input helper="Optional, random by default" v-model="tempoSeed"></md-input>
        </md-field>
          <md-chips class="md-primary shake-on-error" v-model="$store.state.videoChips"
          md-placeholder="Add video">
            <!-- <md-icon md-src="/assets/icon-youtube.svg" /> -->
              <div class="md-helper-text">Copy youtube url or code</div>
            </md-chips>
        </md-tab>
        <md-tab md-label="Load">
          <md-field>
      <label>Browse File</label>
      <md-file v-model="file" />
    </md-field>
        </md-tab>
      </md-tabs>
      <md-dialog-actions>
        <md-button class="md-primary">Close</md-button>
        <md-button class="md-primary" @click="validationProject()">Start</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-accent md-raised" @click="popUp = true">Make a Projet</md-button>
  </div>
</template>

<script>
// import TextField from '@/components/TextField.vue';

export default {
  name: 'Home',
  components: {
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
.home {
  text-align: center;
}

.shake-on-error .md-duplicated {
  animation-name: shake;
  animation-duration: 0.5s;
}

@keyframes shake {
  0% { transform: translate(15px); }
  20% { transform: translate(-15px); }
  40% { transform: translate(7px); }
  60% { transform: translate(-7px); }
  80% { transform: translate(3px); }
  100% { transform: translate(0px); }
}
</style>
