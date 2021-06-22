<template>
  <div class="hello">
    <md-card>
    <md-card-header class="md-title">Load File</md-card-header>

    <md-card-content>
      <div class="md-subheading">
    <label>Choose a file to load:</label>
      </div>
      <input type="file" id="file" name="file" accept=".p00p" />

    </md-card-content>

    <md-card-actions>
    <md-button @click="loadFile">Load</md-button>
    </md-card-actions>

    </md-card>
  </div>
</template>

<script>
export default {
  name: 'LoadForm',
  props: {},
  data: () => ({
    file: null,
  }),
  methods: {
    loadFile() {
      // TODO check file and do stuff
    },
  },
};
</script>

<style>

</style>
