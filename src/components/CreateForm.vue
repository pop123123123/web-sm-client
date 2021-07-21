<template>
  <div class="hello">
    <form @submit.prevent="validateProject">
      <v-app>
        <v-card>
          <v-card-title>Project's Settings</v-card-title>
          <v-card-text>
            <v-text-field v-model="formProject.name" label="Name" required />
            <v-text-field
              v-model="formProject.seed"
              hint="Optional, random by default"
              label="Seed"
            />
            <v-combobox
              v-model="formProject.videoUrls"
              label="Copy youtube url or code"
              multiple
              chips
            ></v-combobox>
            <div>
              <p style="color:#FF0000" v-if="formProject.videoUrls.length < 1">{{
                errorMessage
              }}</p>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn type="sumbit">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-app>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateForm',
  props: {},
  data: () => ({
    formProject: { name: null, seed: null, videoUrls: [] },
    errorMessage: '',
  }),
  methods: {
    validateProject() {
      if (this.formProject.videoUrls.length > 0) {
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
  computed: {},
};
</script>

<style>
/* .error {
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
} */
</style>
