<template>
    <v-app-bar app>
      <v-btn>Change Project</v-btn>
      <Menu name="Edit"/>
    </v-app-bar>
</template>

<script>
import Menu from '@/components/Menu.vue';

export default {
  name: 'Toolbar',
  components: {
    Menu,
  },
  props: {},
};
</script>
