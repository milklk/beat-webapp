<template>
  <section class="password">
    <van-cell-group>
      <!-- eslint-disable-next-line -->
      <van-field
        v-model="oldPassword"
        type="password"
        label="原密码"
        placeholder="请输入原密码"
        @focus="focus"
      />
      <!-- eslint-disable-next-line -->
      <van-field v-model="password" type="password" label="新密码" placeholder="请输入密码" />
      <!-- eslint-disable-next-line -->
      <van-field v-model="confirmPassword" type="password" label="确认新密码" placeholder="请再次输入密码" />
    </van-cell-group>
    <footer class="password__footer">
      <van-button type="info" size="large" @click="submit">确认修改</van-button>
    </footer>
  </section>
</template>

<script>
export default {
  name: "mine-password",
  props: {},
  data() {
    return {
      oldPassword: "",
      password: "",
      confirmPassword: ""
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    submit() {
      const loading = this.$toast.loading({
        mask: true,
        message: "提交修改中"
      });
      setTimeout(() => {
        loading.clear();
        this.$toast.success({
          message: "修改成功",
          duration: 500,
          onClose: () => {
            this.$router.go(-1);
          }
        });
      }, 2000);
    },
    focus(event) {
      console.log(event);
    }
  }
};
</script>

<style lang="stylus" scoped>
.password
  height calc( 100vh - 46px )
  position relative
  top 0
  left 0

.password__footer
  display block
  position absolute
  bottom 0
  left 0
  right 0
  margin auto
  padding 5px 20px

@media ( max-height: 500px )
  .password__footer
    display none
</style>
