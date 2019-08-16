<template>
  <section class="home">
    <h1 class="home__item home__h">
      社戒社康中心
      <img class="home__img" src="../../assets/img/title.png" />
    </h1>
    <ul class="home__content">
      <li class="home__item home__information">
        <header class="item__h">
          <van-icon name="apps-o" size="20" color="#1989fa" />
          <h2 class="h_title">常用功能</h2>
        </header>
        <ul class="information__main">
          <li>
            <router-link to>
              <van-image :src="require('../../assets/img/information-1.png')" />

              <span>衔接</span>
            </router-link>
          </li>
          <li>
            <router-link to>
              <van-image :src="require('../../assets/img/information-2.png')" />

              <span>日常</span>
            </router-link>
          </li>
          <li>
            <router-link to>
              <van-image :src="require('../../assets/img/information-3.png')" />

              <span>审批</span>
            </router-link>
          </li>
          <li>
            <router-link to>
              <van-image :src="require('../../assets/img/information-4.png')" />
              
              <span>移交</span>
            </router-link>
          </li>
        </ul>
      </li>
      <li class="home__item home__feature"></li>
      <li class="home__item home__approve"></li>
      <li class="home__item home__personnel"></li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "home",
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.home
  background #f2f2f2
  padding-bottom 1px

  .home__item
    margin-bottom 10px
    background #fff

    .item__h
      display flex
      justify-content start
      align-items center
      padding-left 15px
      margin-bottom 20px

      .h_title
        padding-left 10px
        font-weight 700

.home__h
  font-size 16px
  font-weight bold
  line-height 34px
  padding 15px

  .home__img
    width 100%
.information__main
  display flex
  justify-content space-around
  align-items center
</style>
