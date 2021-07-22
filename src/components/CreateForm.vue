<template>
  <div>
    <form @submit.prevent="validateProject">
      <v-card elevation="0">
        <v-card-title>Project Settings</v-card-title>
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
            <p class="error--text" v-if="formProject.videoUrls.length < 1">
              {{ errorMessage }}
            </p>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit" text>Create</v-btn>
        </v-card-actions>
      </v-card>
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
        // Check if seed is null or <empty string>
        this.formProject.seed = this.formProject.seed
          ? this.formProject.seed
          : String(Math.floor(Math.random() * 100000));
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
</style>
