<template>
  <div class="hello">
    <form @submit.prevent="validateProject" >
      <md-card>
        <md-card-header class="Title1"> Project's Settings </md-card-header>
        <md-card-content>
          <md-field>
            <label>Project's Name</label>
            <md-input md-input required v-model="tempProject.Name"></md-input>
          </md-field>
          <md-field>
            <label>Seed</label>
            <md-input v-model="tempProject.Seed"> </md-input>
            <span class="md-helper-text">Optional, random by default</span>
          </md-field>
<!-- todo bug with chips, trigger submit when pressing enter on chips -->
          <md-chips
            class="md-primary shake-on-error"
            v-model="tempProject.Videos"
            md-placeholder="Add video"
          >
          <!-- <span
              class="md-error"
              v-if="this.$store.state.videoChips.length() < 1"
              >The first name is required</span
            >
            TODO make error if no video -->
            <div class="md-helper-text">Copy youtube url or code</div>
          </md-chips>
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
  props: {},
  data: () => ({
    tempProject: { Name: null, Seed: null, Videos: [] },
  }),
  methods: {
    validateProject() {
      this.$store.dispatch('CHANGE_PROJECT', this.tempProject);
    },
  },
};
</script>

<style>
.Title1 {
  font-size: x-large;
  text-align: center;
}
</style>
