<template>
  <section class="login" :style="{ height: `${height}px` }">
    <article class="login__article">
      <!-- eslint-disable-next-line -->
      <van-field v-model="user" placeholder="请输入用户名" label="用户名" left-icon="contact" />
      <van-field
        v-model="password"
        type="password"
        placeholder="请输入密码"
        label="密码"
        left-icon="bag-o"
      />
      <van-button type="danger" size="large" @click="login">登录</van-button>
    </article>
  </section>
</template>

<script>
// import { ddAuthCode } from "../../api/dingtalk";
// import { login } from "../../api";
export default {
  name: "login",
  props: {},
  data() {
    return {
      user: "",
      password: "",
      height: 0
    };
  },
  components: {},
  computed: {},
  async created() {
    // this.height = window.innerHeight;
    // const authCode = await ddAuthCode();
    // login(authCode);
  },
  methods: {
    login() {
      this.$router.push({ path: "/home" });
    }
  }
};
</script>

<style lang="stylus" scoped>
.login
  height 100vh
  background url( '../../assets/img/login.jpg' )
  background-size 100% 100%
  position relative
  top 0
  left 0

  .login__article
    position absolute
    width 300px
    top 50%
    left 50%
    transform translate( -50%, -50% )
</style>
