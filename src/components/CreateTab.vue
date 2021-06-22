<template>
  <div class="hello">

          <md-field>
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
          </md-chips>

  </div>
</template>

<script>
export default {
  name: 'CreateForm',
  props: {
  },
};
</script>

<style>
</style>
