<template>
  <!-- app-tabs -->
  <van-tabbar v-model="active">
    <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <!-- eslint-disable-next-line -->
    <van-tabbar-item v-if="!unread" to="/messages" icon="comment-o">消息</van-tabbar-item>
    <!-- eslint-disable-next-line -->
    <van-tabbar-item v-else to="/messages" icon="comment-o" :info="unread">消息</van-tabbar-item>
    <van-tabbar-item to="/contacts" icon="phone-o">通讯录</van-tabbar-item>
    <van-tabbar-item to="/publicity" icon="volume-o">宣传</van-tabbar-item>
    <van-tabbar-item to="/mine" icon="friends-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "footer-tab",
  props: {},
  data() {
    return {
      active: 0,
      paths: ["/home", "/messages", "/contacts", "/publicity", "/mine"]
    };
  },
  watch: {
    $route() {
      this.$_setActive();
    }
  },
  components: {},
  computed: {
    ...mapState("messagesU", {
      unread: state => state.unread
    })
  },
  created() {
    this.$_setActive();
  },
  methods: {
    // 设置tab栏高亮tab
    $_setActive() {
      const path = this.$route.path;
      this.active = this.paths.findIndex(d => path.indexOf(d) === 0);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
