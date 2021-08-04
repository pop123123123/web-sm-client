<template>
  <div>
    <video ref="video" @ended="next">
      <source :src="src" type="video/webm">
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data() {
    return {
      src: '',
      currentIndex: null,
      urls: null,
    };
  },
  methods: {
    preview(url) {
      const videoElem = this.$refs.video;
      this.src = url;

      // start video
      videoElem.load();
      videoElem.currentTime = 0;
      videoElem.play();
    },
    startPreview() {
      // requested preview
      if (!this.toPreview) return;
      if (this.toPreview.find((_, i) => this.$store.getters.getPreview(i) === undefined)) return;

      this.urls = this.toPreview.map((_, i) => window.URL.createObjectURL(this.$store.getters
        .getPreview(i)));

      this.$refs.video.pause();
      this.preview(this.urls[0]);
      this.currentIndex = 0;
    },
    next() {
      console.log('next');
      this.currentIndex += 1;
      if (this.toPreview.length > this.currentIndex) {
        this.preview(this.urls[this.currentIndex]);
      }
    },
  },
  watch: {
    toPreview() {
      this.startPreview();
    },
  },
  computed: {
    toPreview() {
      return this.$store.state.lastPreview;
    },
  },
  mounted() {
    // this.$refs.video.addEventListener('ended', this.next);
    this.startPreview();
    this.$store.state.videoComponent = this;
  },
  destroyed() {
    this.$store.state.videoComponent = undefined;
  },
};
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  min-width: 200px;
}
</style>
