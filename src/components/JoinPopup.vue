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
          <v-btn color="primary" dark @click="$emit('wantToCreate')"> New Project </v-btn>
        </v-toolbar>
      </template>
      <template slot="no-data">
        <div>No projects for now. Create yours !</div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text color="primary" @click="join(item)">Join</v-btn>
        <v-btn icon color="warning" @click="confirm(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <ConfirmDialog ref="confirm"/>
  </div>
</template>

<script>
import action from '@/store/action-types';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const confirmMessage = 'Are you sure you want to delete this project ? This cannot be undone.';

export default {
  name: 'JoinPopup',
  components: {
    ConfirmDialog,
  },
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
    async confirm(project) {
      if (await this.$refs.confirm.open(`Delete ${project.name} ?`, confirmMessage)) { this.$store.dispatch(action.DELETE_PROJECT, project.name); }
    },
  },
};
</script>

<style>
</style>
