<template>
  <div>
    <v-card elevation="0">
      <v-card-title>Load File</v-card-title>
      <v-card-text>
        <label>Choose a file to load:</label>
        <v-file-input label="Project file" truncate-length="15"></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="loadFile">Load</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoadForm',
  methods: {
    loadFile() {
      // TODO check file and do stuff
    },
  },
};
</script>

<style>
</style>
