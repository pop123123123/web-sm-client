<template>
    <v-app-bar dark app color="primary">
      <Menu name="Edit"/>
      <v-btn text @click="showPopup = true">Change Project</v-btn>
      <ProjectPopUp v-model="showPopup"/>
    </v-app-bar>
</template>

<script>
import Menu from '@/components/Menu.vue';
import ProjectPopUp from '@/components/ProjectPopUp.vue';

export default {
  name: 'Toolbar',
  components: {
    Menu,
    ProjectPopUp,
  },
  data() {
    return {
      showPopup: false,
    };
  },
  props: {},
};
</script>
