<template>
  <div>
    <video ref="video">
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
      const videoElem = this.$refs.video;
      videoElem.pause();
      this.src = window.URL.createObjectURL(blob);

      // start video
      videoElem.load();
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

<style lang="scss" scoped>
video {
  width: 100%;
  min-width: 200px;
}
</style>
