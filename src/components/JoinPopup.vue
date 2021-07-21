<template>
  <div>
    <v-data-table
      :items="$store.state.projects"
      hide-default-footer
      :items-per-page="-1"
      :headers="headers"
      disable-sort
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Projects</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="secondary" dark> New Project </v-btn>
        </v-toolbar>
      </template>
      <template slot="no-data">
        <div>No projects for now. Create yours !</div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn outlined elevation="0" @click="join(item)">Join</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import action from '@/store/action-types';

export default {
  name: 'JoinPopup',
  props: {},
  data: () => ({
    action,
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Seed', value: 'seed' },
      { text: 'Actions', value: 'actions', align: 'center' },
      // { text: 'Users',value:'users'},
    ],
  }),
  methods: {
    join(project) {
      this.$store.dispatch(this.action.JOIN_PROJECT, project.name);
      this.$emit('join');
    },
  },
};
</script>

<style>
</style>
