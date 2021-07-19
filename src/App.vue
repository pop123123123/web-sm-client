<template>
  <div class="page-container">
    <router-view />
    <SnackbarError
      :snackbar="showSnackbarError"
      :text="socketErr"
      timeout="3000"
      bottom
      right
      @end="$store.dispatch(action.CHANGE_SOCKET_ERROR,'')"
    />
  </div>
</template>

<script>
import SnackbarError from '@/components/SnackbarError.vue';
import action from '@/store/action-types';

export default {
  data: () => ({
    action,
  }),
  components: {
    SnackbarError,
  },
  computed: {
    socketErr() {
      return this.$store.state.socketError;
    },
    showSnackbarError() {
      return (this.socketErr !== '');
    },
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page-container {
  width: 100vw;
  height: 100vh;

  .md-app {
    width: 100%;
    height: 100%;
  }
}
</style>
