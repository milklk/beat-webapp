<template>
  <div id="app">
    <!-- <header class="app__header" v-show="$route.meta.header">
      <headerBar />
    </header>-->
    <main class="app__main" ref="main" :class="mainClass">
      <keep-alive>
        <router-view />
      </keep-alive>
    </main>
    <footer class="app__footer" v-show="$route.meta.footer">
      <footerTab />
    </footer>
  </div>
</template>
<script>
import footerTab from "./components/tab/tab";
import headerBar from "./components/bar/bar";
import { ddAuthCode, ddTitle } from "./api/dingtalk";
import { login } from "./api";
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
  },
  async created() {
    const authCode = await ddAuthCode();
    const user = await login(authCode);
    if (user.ret === "200") {
      window.sessionStorage.setItem("token", user.data.token);
      this.$router.push({ path: "/home" });
    }
  },
  mounted() {},
  watch: {
    $route() {
      this.mainClass = {
        // "app__main--header": this.$route.meta.header,
        "app__main--footer": this.$route.meta.footer
      };
      this.$nextTick(() => {
        this.$refs.main.scrollTo(0, 0);
      });
      const header = this.$route.params.header
        ? this.$route.params.header
        : this.$route.meta.header;
      this.title = header ? header : "";
      ddTitle(header);
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
  overflow auto

  &.app__main--header
    height calc( 100vh - 46px + 46px )
    margin-top 46px

  &.app__main--footer
    height calc( 100vh - 50px )

  &.app__main--header.app__main--footer
    height calc( 100vh - 96px )
    margin-top 46px
</style>
