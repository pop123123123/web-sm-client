<template>
  <div class="page-container">
     <router-view/>
  </div>
</template>

<script>
export default {
  data: () => ({
    menuVisible: false,
  }),
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
