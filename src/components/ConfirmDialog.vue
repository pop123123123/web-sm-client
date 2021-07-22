<template>
  <v-dialog v-model="show" width="500" @keydown.esc="cancel">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <p>
          {{message}}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="info"
          text
          @click.native="cancel"
          >Cancel</v-btn
        >
        <v-btn
          color="error"
          @click.native="agree"
          >OK</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  data() {
    return {
      show: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
    };
  },

  methods: {
    open(title, message) {
      this.show = true;
      this.title = title;
      this.message = message;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.show = false;
    },
    cancel() {
      this.resolve(false);
      this.show = false;
    },
  },
};
</script>
