<template>
  <section class="mine">
    <div v-show="$route.path === '/mine'">
      <header class="mine__header">
        <h3 class="header__h">
          <article>
            <strong class="h__name">{{ mine.account }}</strong>
          </article>
        </h3>
        <p class="header__p">身份证号：{{ mine.idCard }}</p>
        <p class="header__p">联系方式：{{ mine.userMobile }}</p>
        <p class="header__p">居住地址：{{ mine.address }}</p>
      </header>
      <van-cell-group>
        <van-cell title="修改资料" is-link to="/mine/datum" />
        <!-- <van-cell title="一键举报" is-link to="/mine/report" /> -->
        <van-cell title="关于" is-link to="/mine/about" />
      </van-cell-group>
    </div>
    <router-view />
  </section>
</template>

<script>
import { mineDetail } from "../../api";
export default {
  name: "mine",
  props: {},
  data() {
    return {
      mine: {}
    };
  },
  components: {},
  computed: {},
  async created() {
    const mine = await mineDetail();
    if (mine.ret === "200") {
      this.mine = mine.data;
    }
  },
  watch: {
    async $route() {
      if (this.$route.path === "/mine") {
        const mine = await mineDetail();
        if (mine.ret === "200") {
          this.mine = mine.data;
        }
      }
    }
  }
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
