<template>
  <div id="app">
    <header class="app__header" v-show="$route.meta.header">
      <headerBar />
    </header>
    <main class="app__main" ref="main" :class="mainClass">
      <div>
        <router-view />
      </div>
    </main>
    <footer class="app__footer" v-show="$route.meta.footer">
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
      },
      bs: {}
    };
  },
  components: {
    footerTab,
    headerBar
  },
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.main, {
        scrollY: true,
        click: true,
        probeType: 3 // listening scroll hook
      });
    });
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  watch: {
    $route() {
      this.mainClass = {
        "app__main--header": this.$route.meta.header,
        "app__main--footer": this.$route.meta.footer
      };
      this.$nextTick(() => {
        this.bs.scrollTo(0, 0, 0);
        this.bs.refresh();
      });
    }
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
  overflow hidden

  &.app__main--header
    height calc( 100vh - 46px )
    margin-top 46px

  &.app__main--footer
    height calc( 100vh - 50px )

  &.app__main--header.app__main--footer
    height calc( 100vh - 96px )
</style>
