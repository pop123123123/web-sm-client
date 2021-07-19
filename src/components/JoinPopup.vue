<template>
  <div class="hello">
    <md-card>
    <md-card-header class="md-title">Join a project</md-card-header>

    <md-card-content>
      <div class="md-subheading">
    <label>Projects List : </label>
      </div>
      <li v-for="(project, index) in $store.state.projects" :key="index">
       <h3>{{project}}</h3>
        <v-btn outlined elevation="0" @click="join(project)">Join</v-btn>
      </li>
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
  }),
  methods: {
    join(project) {
      this.$store.dispatch(this.action.JOIN_PROJECT, project.name);
      this.$emit('join');
    },
  },
  created() {
    this.$store.dispatch(action.LIST_PROJECTS);
  },
};
</script>

<style>
</style>
