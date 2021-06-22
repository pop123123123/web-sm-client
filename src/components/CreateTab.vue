<template>
  <div class="hello">

    <!-- <md-field>
            <label>Project's Name</label>
            <md-input md-input required v-model="tempoName"></md-input>
          </md-field>
          <md-field>
            <label>Seed</label>
            <md-input
              md-input
              helper="Optional, random by default"
              v-model="tempoSeed"
            ></md-input>
          </md-field>
          <md-chips
            class="md-primary shake-on-error"
            v-model="$store.state.videoChips"
            md-placeholder="Add video"
          >
            <div class="md-helper-text">Copy youtube url or code</div>
          </md-chips> -->
    <form>
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

          <md-chips
            class="md-primary shake-on-error"
            v-model="$store.state.videoChips"
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
    tempProject: { Name: null, Seed: null },
    test: [1, 5, 'yui'],
  }),
};
</script>

<style>
.Title1 {
  font-size: x-large;
  text-align: center;
}
</style>
