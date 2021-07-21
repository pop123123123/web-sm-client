<template>
  <div class="hello">
    <v-app>
<!-- TODO Add a layout ? -->
    <v-card>
      <v-card-title>Load File</v-card-title>
      <v-card-text>
        <div class="md-subheading">
          <label>Choose a file to load:</label>
        </div>
        <input type="file" id="file" name="file" accept=".p00p" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="loadFile">Load</v-btn>
      </v-card-actions>
    </v-card>
    </v-app>
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
