<template>
  <div>
    <v-card elevation="0">
      <v-card-title>Load File</v-card-title>
      <v-card-text>
        <label>Choose a file to load:</label>
        <v-file-input label="Project file" truncate-length="15"></v-file-input>
        <label>Or choose from local storage:</label>
        <v-select label="Select a project" :items="items"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="refreshProjects">Refresh</v-btn>
        <v-btn color="primary" text @click="loadFile">Load</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { list } from '@/utils/storage';

export default {
  name: 'LoadForm',
  data: () => ({
    projects: list(),
  }),
  computed: {
    items() {
      return Object.keys(this.projects);
    },
  },
  methods: {
    loadFile() {
      // TODO check file and do stuff
    },
    refreshProjects() {
      this.projects = list();
    },
  },
};
</script>

<style>
</style>
