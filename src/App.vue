<template>
  <v-app>
    <Toolbar/>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
      <SnackbarError
        :snackbar="showSnackbarError"
        :text="socketErr"
        timeout="3000"
        bottom
        right
        @end="$store.dispatch(action.CHANGE_SOCKET_ERROR, '')"
      />
    </v-main>
  </v-app>
</template>

<script>
import SnackbarError from '@/components/SnackbarError.vue';
import Toolbar from '@/components/Toolbar.vue';
import action from '@/store/action-types';

export default {
  data: () => ({
    action,
  }),
  components: {
    SnackbarError,
    Toolbar,
  },
  computed: {
    socketErr() {
      return this.$store.state.socketError;
    },
    showSnackbarError() {
      return this.socketErr !== '';
    },
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
