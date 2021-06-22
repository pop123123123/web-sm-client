<template>
  <div class="hello">
    <form @submit.prevent="validateProject">
      <md-card>
        <md-card-header class="md-title"> Project's Settings </md-card-header>
        <md-card-content>
          <md-field>
            <label>Project's Name</label>
            <md-input md-input required v-model="formProject.name"></md-input>
          </md-field>
          <md-field>
            <label>Seed</label>
            <md-input v-model="formProject.seed"> </md-input>
            <span class="md-helper-text">Optional, random by default</span>
          </md-field>
          <!-- TODO bug with chips, trigger submit when pressing enter on chips -->

          <md-chips
            class="md-primary shake-on-error"
            v-model="formProject.video_urls"
            md-placeholder="URL"
          >
            <div class="md-helper-text">Copy youtube url or code
            </div>

          </md-chips>
          <div class="md-caption"> <span
              class="error"
              v-if="formProject.video_urls.length < 1"
              >{{ errorMessage }}</span
            ></div>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit">Submit</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateForm',
  props: {
  },
  data: () => ({
    formProject: { name: null, seed: null, video_urls: [] },
    errorMessage: '',
  }),
  methods: {
    validateProject() {
      if (this.formProject.video_urls.length > 0) {
        this.sendFormValid();
        this.$store.dispatch('CREATE_PROJECT', this.formProject);
      } else {
        this.errorMessage = 'The project must have at least 1 video';
      }
    },
    sendFormValid() {
      this.$emit('formValid');
    },
  },
  computed: {

  },
};
</script>

<style>
.error {
  color: red;
}
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
