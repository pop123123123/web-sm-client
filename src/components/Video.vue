<template>
  <div>
    <video
      v-for="i in 2"
      :key="i"
      ref="video"
      v-show="currentIndex % 2 === i - 1"
      @loadeddata="loaded(i - 1)"
    ></video>
  </div>
</template>

<script>
import Debug from 'debug';

const debug = Debug('app:video');

export default {
  name: 'Video',
  data() {
    return {
      currentIndex: 0,
      urls: [],
      timeout: 0,
    };
  },
  methods: {
    video(index) {
      return this.$refs.video[index % 2];
    },
    reset() {
      this.video(0).src = '';
      this.video(1).src = '';
      this.currentIndex = 0;
      this.urls = [];
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = 0;
    },
    play(index) {
      debug('play');
      this.video(index).play();
    },
    load(index) {
      debug('load', index);
      const videoElem = this.video(index);
      const url = this.urls[index];
      videoElem.pause();
      videoElem.src = url;
      videoElem.load();
      return videoElem;
    },
    startPreview() {
      this.reset();
      // requested preview
      if (!this.toPreview) return;
      if (this.toPreview.find((_, i) => this.$store.getters.getPreview(i) === undefined)) return;

      this.urls = this.toPreview.map((_, i) => window.URL.createObjectURL(this.$store.getters
        .getPreview(i)));

      this.load(0);
    },
    loaded(index) {
      debug('loaded', index);
      const el = this.video(this.currentIndex);
      if (index === 0 && this.currentIndex === 0) {
        this.playAndLoadNext(false);
      } else {
        debug('timeout');
        this.timeout = setTimeout(
          this.playAndLoadNext,
          (el.duration - el.currentTime) * 1000,
        );
      }
    },
    playAndLoadNext(increment = true) {
      if (increment) {
        this.currentIndex += 1;
      }
      this.play(this.currentIndex);
      if (this.currentIndex < this.urls.length - 1) {
        this.load(this.currentIndex + 1);
      }
    },
  },
  computed: {
    toPreview() {
      return this.$store.state.lastPreview;
    },
  },
  mounted() {
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
