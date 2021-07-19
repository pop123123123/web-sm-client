<template>
    <v-snackbar
      v-model="showSnack"
      color="rgba(255, 0, 0, 0.8)"
      :bottom="bottom"
      :left="left"
      :right="right"
      :top="top"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="$store.dispatch(action.CHANGE_SOCKET_ERROR,'')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import action from '@/store/action-types';

export default {
  name: 'SnackbarError',
  props: {
    snackbar: Boolean,
    text: String,
    timeout: String,
    bottom: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean,

  },
  data: () => ({
    action,
  }),
  computed: {
    showSnack: {
      get() {
        return this.snackbar;
      },
      set() {
        this.$emit('end');
      },
    },
  },
};
</script>
