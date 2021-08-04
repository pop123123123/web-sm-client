<template>
  <div>
    <video ref="video0" v-show="currentIndex % 2 === 0" @canplaythrough="loaded(0)">
      <source :src="src[0]" type="video/webm">
      Sorry, your browser doesn't support embedded videos.
    </video>
    <video ref="video1" v-show="currentIndex % 2 === 1">
      <source :src="src[1]" type="video/webm">
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data() {
    return {
      src: ['', ''],
      currentIndex: null,
      urls: null,
      timeout: null,
    };
  },
  methods: {
    reset() {
      this.$set(this.src, 0, '');
      this.$set(this.src, 1, '');
      this.urls = null;
      this.currentIndex = null;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = null;
    },
    play(element) {
      this.$refs[`video${element}`].play();
    },
    load(url, element) {
      const videoElem = this.$refs[`video${element}`];
      videoElem.pause();
      this.$set(this.src, element, url);
      videoElem.load();
      videoElem.currentTime = 0;
      return videoElem;
    },
    preview(url, element) {
      // load and start video
      this.load(url, element).play();
    },
    startPreview() {
      this.reset();
      // requested preview
      if (!this.toPreview) return;
      if (this.toPreview.find((_, i) => this.$store.getters.getPreview(i) === undefined)) return;

      this.urls = this.toPreview.map((_, i) => window.URL.createObjectURL(this.$store.getters
        .getPreview(i)));

      this.currentIndex = 0;
      this.load(this.urls[0], 0);
    },
    loaded(element) {
      if (this.currentIndex === 0) {
        const el = this.$refs[`video${element}`];
        if (this.urls.length > 1) {
          this.load(this.urls[1], 1);
          this.timeout = setTimeout(
            this.next,
            el.duration * 1000,
          );
        }
        el.play();
      }
    },
    next() {
      this.currentIndex += 1;
      if (this.toPreview.length > this.currentIndex + 1) {
        this.load(this.urls[this.currentIndex + 1], (this.currentIndex + 1) % 2);
        const el = this.$refs[`video${this.currentIndex % 2}`];
        this.timeout = setTimeout(
          this.next,
          el.duration * 1000,
        );
      }
      this.play(this.currentIndex % 2);
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
