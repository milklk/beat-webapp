<template>
  <section class="datum" >
    <van-cell-group>
      <!-- eslint-disable-next-line -->
      <van-field v-model="name" label="用户名" placeholder="请输入用户名" />
      <!-- eslint-disable-next-line -->
      <van-field v-model="sex" label="性别" placeholder="请输入性别" />
      <!-- eslint-disable-next-line -->
      <van-field v-model="phone" label="联系电话" placeholder="请输入联系电话" />
      <!-- eslint-disable-next-line -->
      <van-field v-model="work" label="公司" placeholder="请输入公司" />
      <!-- eslint-disable-next-line -->
      <van-field v-model="phone" label="职位" placeholder="请输入职位" />
      <!-- eslint-disable-next-line -->
      <van-field v-model="email" label="电子邮件" placeholder="请输入电子邮件" />
    </van-cell-group>
    <footer class="datum__footer">
      <van-button type="info" size="large" @click="submit">确认修改</van-button>
    </footer>
  </section>
</template>

<script>
export default {
  name: "mine-datum",
  props: {},
  data() {
    return {
      name: "彭晓薇",
      sex: "女",
      phone: "12312312311",
      email: "xiaowei2015@chuxin.com",
      work: "初心社工咨询有限公司",
      job: "初心社工"
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.datum
  height calc( 100vh - 46px )
  position relative
  top 0
  left 0


.datum__footer
  display block
  position absolute
  bottom 0
  left 0
  right 0
  margin auto
  padding 5px 20px

@media ( max-height: 250px )
  .datum__footer
    display none
</style>
