<template>
  <div class="grey lighten-4">
    <div v-show="!isReadyToPlay" class="py-8 text-center">
      <div>
        <v-progress-circular
          :size="50"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div class="mt-4">
        Loading segments... ({{ Math.round(readyCount/totalCount*100) }}%)
      </div>
    </div>
    <div v-show="isReadyToPlay">
      <video
        v-for="url, i in urls"
        :key="i"
        :src="url"
        ref="video"
        v-show="currentIndex % totalCount === i"
        @canplaythrough="updateReadyCount()"
      ></video>
    </div>
  </div>
</template>

<script>
import Debug from 'debug';

const debug = Debug('app:video');

export default {
  name: 'Video',
  data() {
    return {
      currentIndex: -1,
      urls: [],
      durations: [],
      timeout: 0,
      forceReadyUpdateValue: 0,
    };
  },
  methods: {
    video(index) {
      if (this.$refs.video !== undefined && this.totalCount > 0) {
        return this.$refs.video[index % this.totalCount];
      }
      return undefined;
    },
    reset() {
      debug('reset');
      for (let index = 0; index < this.totalCount; index += 1) {
        this.video(index).src = '';
      }
      this.currentIndex = -1;
      this.urls.forEach((url) => { URL.revokeObjectURL(url); });
      this.urls = [];
      this.durations = [];
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = 0;
    },
    play(index) {
      debug('play', index);
      this.video(index)?.play();
    },
    load(index) {
      debug('load', index);
      const videoElem = this.video(index);
      if (videoElem === undefined) return undefined;
      videoElem.pause();
      videoElem.load();
      return videoElem;
    },
    startPreview() {
      this.reset();
      // requested preview
      if (!this.toPreview) return;
      if (this.toPreview.find((_, i) => this.$store.getters.getPreview(i) === undefined)) return;

      this.urls = this.toPreview.map((_, i) => URL.createObjectURL(this.$store.getters
        .getPreview(i)));
      this.durations = Array(this.urls.length).fill(0);

      this.urls.forEach((url, i) => {
        this.load(i);
      });
    },
    startVideos() {
      debug('startVideos');
      this.playNext();
    },
    playNext() {
      debug('playNext');
      this.currentIndex += 1;
      this.play(this.currentIndex);
      if (this.currentIndex < this.urls.length - 1) {
        const timeout = this.durations[this.currentIndex];
        debug('timeout', timeout);
        this.timeout = setTimeout(this.playNext, timeout * 1000);
      }
    },
    updateReadyCount() {
      this.forceReadyUpdateValue += 1;
    },
  },
  computed: {
    toPreview() {
      return this.$store.state.lastPreview;
    },
    isReadyToPlay() {
      return (this.currentIndex < 0 ? 0 : this.currentIndex) + this.readyCount >= this.totalCount;
    },
    readyStates() {
      if (this.forceReadyUpdateValue);
      return this.urls.map((url, i) => {
        const el = this.video(i);
        const isReady = el?.readyState === 4;
        if (isReady) {
          this.durations[i] = el.duration;
        }
        return isReady ? 1 : 0;
      });
    },
    readyCount() {
      return this.readyStates
        .slice(this.currentIndex < 0 ? 0 : this.currentIndex)
        .reduce((acc, val) => acc + val, 0);
    },
    totalCount() {
      return this.urls.length;
    },
  },
  watch: {
    isReadyToPlay(val, prev) {
      debug('watch isReadyToPlay', prev, val);
      if (!prev && val) {
        // isReadyToPlay becomes true
        if (this.currentIndex < 0) {
          this.startVideos();
        } else {
          debug('cannot start preview, already playing');
        }
      } else {
        debug('readyStates', this.readyStates);
      }
    },
  },
  mounted() {
    this.$store.state.videoComponent = this;
  },
  beforeDestroy() {
    this.reset();
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
