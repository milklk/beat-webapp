<template>
  <section class="mine">
    <div v-show="$route.path === '/mine'">
      <header class="mine__header">
        <h3 class="header__h">
          <article>
            <strong class="h__name">{{ mine.name }}</strong>
            <span class="h__sex">（{{ mine.sex }}）</span>
          </article>
          <p class="header__p">{{ mine.phone }}</p>
        </h3>
        <p class="header__p">
          <span>{{ mine.work }}</span>
          <span>{{ mine.job }}</span>
        </p>
        <p class="header__p">电子邮件：{{ mine.email }}</p>
      </header>
      <van-cell-group>
        <van-cell title="修改密码" is-link to="/mine/password" />
        <van-cell title="修改资料" is-link to="/mine/datum" />
        <van-cell title="一键举报" is-link to="/mine/report" />
        <van-cell title="关于" is-link to="/mine/about" />
      </van-cell-group>
    </div>
    <router-view />
  </section>
</template>

<script>
export default {
  name: "mine",
  props: {},
  data() {
    return {
      mine: {
        name: "彭晓薇",
        sex: "女",
        phone: "12312312311",
        email: "xiaowei2015@chuxin.com",
        work: "初心社工咨询有限公司",
        job: "初心社工"
      }
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.mine__header
  border-bottom 10px solid #f2f2f2
  height 130px
  padding 10px 20px
  display flex
  flex-direction column
  justify-content space-between

  .header__h
    display flex
    justify-content space-between
    font-weight normal

    .h__name
      font-size 16px
      font-weight normal
      color #152952

    .h__sex
      font-size 12px
      color #737397

  .header__p
    font-size 14px
    color #737397
    display flex
    justify-content space-between
</style>
