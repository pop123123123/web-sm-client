<template>
  <div class="join">
    <div class="md-subheading">
      <label>Projects List : </label>
    </div>
    <v-data-table
      :items="$store.state.projects"
      hide-default-footer
      :items-per-page="-1"
      :headers="headers"
      disable-sort
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.seed }}</td>
          <v-btn outlined elevation="0" @click="join(item)">Join</v-btn>
        </tr>
      </template>
      </v-data-table>
    <md-button @click="$store.dispatch(action.LIST_PROJECTS);">Refresh</md-button>
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
      // { text: 'Users',value:'users'},
      { text: '', width: '139px' },
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
