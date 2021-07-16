<template>
  <div class="hello">
    <md-card>
    <md-card-header class="md-title">Join a project</md-card-header>

    <md-card-content>
      <div class="md-subheading">
    <label>Projects List : </label>
      </div>
      <template v-for="(val,index) in projectList.length">
      <li :key="index">
       <h3>{{projectList[index]}}</h3>
        <v-btn outlined elevation="0">Join</v-btn>
      </li>
      </template>
    </md-card-content>

    <md-card-actions>
    <md-button @click="$store.dispatch(action.LIST_PROJECTS);">Refresh</md-button>
    </md-card-actions>

    </md-card>
  </div>
</template>

<script>
import action from '@/store/action-types';

export default {
  name: 'JoinPopup',
  props: {},
  data: () => ({
    action,
    projectList: [], // TODO out of the screen if too long
  }),
  methods: {
    // joinRoom(roomNumber) {
    // TODO join room number X on button click
    // },
  },
  created() {
    this.$store.dispatch(action.LIST_PROJECTS);
  },
};
</script>

<style>
</style>
