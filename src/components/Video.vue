<template>
  <div>
    <video ref="video" controls>
      <source :src="src" type="video/webm">
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</template>

<script>
export default {
  name: 'Video',
  props: {
    sentence: {
      type: String,
      default: undefined,
    },
    comboIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      src: '',
    };
  },
  methods: {
    startPreview() {
      // requested preview
      if (this.sentence === undefined) return;

      // get video blob
      const blob = this.$store.getters.getPreview(this.sentence, this.comboIndex);
      if (blob === undefined) return;

      // set video src
      this.src = URL.createObjectURL(blob);
      const videoElem = this.$refs.video;

      // start video
      videoElem.currentTime = 0;
      videoElem.play();
    },
  },
  watch: {
    sentence() {
      this.startPreview();
    },
    comboIndex() {
      this.startPreview();
    },
  },
  mounted() {
    this.startPreview();
  },
};
</script>
