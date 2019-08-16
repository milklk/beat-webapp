<template>
  <van-tabbar v-model="active">
    <router-link class="tab__link" to="/home">
      <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
    </router-link>
    <router-link class="tab__link" to="/message">
      <van-tabbar-item icon="comment-o" info="5">消息</van-tabbar-item>
    </router-link>
    <router-link class="tab__link" to="/contacts">
      <van-tabbar-item icon="phone-o">通讯录</van-tabbar-item>
    </router-link>
    <router-link class="tab__link" to="/publicity">
      <van-tabbar-item icon="volume-o">宣传</van-tabbar-item>
    </router-link>
    <router-link class="tab__link" to="/mine">
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </router-link>
  </van-tabbar>
</template>

<script>
export default {
  name: "footer-tab",
  props: {},
  data() {
    return {
      active: 0
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.tab__link
  flex 1
  display flex
</style>
