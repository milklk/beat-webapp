<template>
  <div id="app">
    <header class="app__header" v-show="$route.meta.header">
      <headerBar />
    </header>
    <main class="app__main" ref="main" :class="mainClass">
      <div class="scroll">
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
        "app__main--footer": this.$route.meta.footer,
        "app__main--ios": this.$userAgent === "ios"
      },
      bs: {}
    };
  },
  components: {
    footerTab,
    headerBar
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.main, {
        scrollY: true,
        click: true,
        probeType: 3 // listening scroll hook
      });
      const bs = this.bs;
      const input = document.querySelectorAll("input");
      const textarea = document.querySelectorAll("textarea");
      const field = [...input, ...textarea];
      field.forEach(d => {
        d.onfocus = function() {
          bs.scrollToElement(this);
        };
        d.onblur = function() {
          bs.scrollTo(0, 0, 0);
          bs.refresh();
        };
      });
      window.onresize = () => {
        bs.scrollTo(0, 0, 0);
        bs.refresh();
      };
    });
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  watch: {
    $route() {
      this.mainClass = {
        "app__main--header": this.$route.meta.header,
        "app__main--footer": this.$route.meta.footer,
        "app__main--ios": this.$userAgent === "ios"
      };
      this.$nextTick(() => {
        this.bs.scrollTo(0, 0, 0);
        this.bs.refresh();
        const bs = this.bs;
        const input = document.querySelectorAll("input");
        const textarea = document.querySelectorAll("textarea");
        const field = [...input, ...textarea];
        field.forEach(d => {
          d.onfocus = function() {
            bs.scrollToElement(this);
          };
          d.onblur = function() {
            bs.scrollTo(0, 0, 0);
            bs.refresh();
          };
        });
      });
    }
  }
};
</script>
<style lang="stylus">
html, body
  width 100vw

.app__header
  width 375px
  height 46px
  position absolute
  top 0
  left 0

.app__footer
  width 375px
  height 50px
  position absolute
  bottom 0
  left 0

.app__main
  box-sizing border-box
  width 375px
  position absolute
  top 0
  left 0
  overflow hidden

  &.app__main--header
    height calc( 100vh - 46px )
    margin-top 46px

    &.app__main--ios
      height calc( 100vh - 46px - 75px )

  &.app__main--footer
    height calc( 100vh - 50px )

    &.app__main--ios
      height calc( 100vh - 50px - 75px )

  &.app__main--header.app__main--footer
    height calc( 100vh - 96px )
    margin-top 46px

    &.app__main--ios
      height calc( 100vh - 96px - 75px )
</style>
