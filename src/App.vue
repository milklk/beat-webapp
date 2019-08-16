<template>
  <div id="app">
    <header class="app__header" v-show="$route.meta.header">
      <headerBar />
    </header>
    <main class="app__main" :class="mainClass">
      <router-view />
    </main>
    <footer class="app__footer">
      <footerTab />
    </footer>
  </div>
</template>
<script>
import footerTab from "./components/tab/tab";
import headerBar from "./components/bar/bar";
export default {
  name: "web-app",
  data() {
    return {
      mainClass: {
        "app__main--header": this.$route.meta.header,
        "app__main--footer": this.$route.meta.footer
      }
    };
  },
  components: {
    footerTab,
    headerBar
  }
};
</script>
<style lang="stylus">
html, body
  width 100vw
  height 100vh
  overflow hidden

.app__header
  width 375px
  height 46px
  position fixed
  top 0
  left 0

.app__footer
  width 375px
  height 50px
  position fixed
  bottom 0
  left 0

.app__main
  box-sizing border-box
  width 375px
  height 100vh

  &.app__main--header
    padding-top 46px

  &.app__main--footer
    padding-bottom 50px
</style>
