<template>
  <section class="contacts">
    <div v-show="$route.path === '/contacts'">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="search"
        shape="round"
        background="#f2f2f2"
        @search="submit"
      />
      <article
        class="contacts__list"
        :class="{'contacts__list--ios': $userAgent === 'ios'}"
        ref="contacts"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
        >
          <!-- eslint-disable-next-line -->
          <router-link
            v-for="(item, i) in list"
            :key="i"
            :name="i"
            class="list__item"
            :to="{ name: 'contact', params: { id: 1 } }"
          >
            <!-- eslint-disable-next-line -->
            <van-image class="item__avatar" :src="require('../../assets/img/people-head.png')" />
            <ul class="item__content">
              <li class="content__li">
                <p class="li__p">
                  <strong class="p__strong">王晓婷</strong>
                  <span class="p__span">（临桂区）</span>
                </p>
                <p class="li__p">18011981787</p>
              </li>
              <li class="content__li">
                <p class="li__p">45505319******1100</p>
                <p class="li__p">
                  <!-- eslint-disable-next-line -->
                  <van-tag class="van-tag" v-if="item.risk === 30" type="danger">高风险</van-tag>
                  <!-- eslint-disable-next-line -->
                  <van-tag class="van-tag" v-else-if="item.risk === 20" color="rgb(255, 153, 0)">
                    <!-- eslint-disable-next-line -->
                    中风险
                  </van-tag>
                  <!-- eslint-disable-next-line -->
                  <van-tag class="van-tag" v-else type="success">低风险</van-tag>
                  <!-- eslint-disable-next-line -->
                  <van-tag class="van-tag" v-if="item.status">{{ item.status }}</van-tag>
                </p>
              </li>
            </ul>
          </router-link>
        </van-list>
      </article>
    </div>
    <header v-show="$route.path !== '/contacts'" class="contact__header">
      <h3 class="header__h">
        <article>
          <strong class="h__name">{{ addict.name }}</strong>
          <span class="h__area">（{{ addict.area }}）</span>
        </article>
        <!-- eslint-disable-next-line -->
        <van-tag class="van-tag" v-if="addict.risk === 30" type="danger">高风险</van-tag>
        <!-- eslint-disable-next-line -->
        <van-tag class="van-tag" v-else-if="addict.risk === 20" color="rgb(255, 153, 0)">中风险</van-tag>
        <!-- eslint-disable-next-line -->
        <van-tag class="van-tag" v-else type="success">低风险</van-tag>
      </h3>
      <p class="header__p">
        <!-- eslint-disable-next-line -->
        {{addict.phone}} {{ addict.type }} {{ addict.startTime }} 至 {{ addict.endTime }}
      </p>
      <p class="header__p">{{ addict.site }}</p>
    </header>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "contacts",
  props: {},
  data() {
    return {
      loading: true,
      finished: false,
      result: [],
      search: "",
      list: [
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        }
      ],
      addict: {
        name: "张怀志",
        area: "临桂区",
        risk: 20,
        phone: 18211981789,
        type: "社区戒毒",
        startTime: "2017-7-1",
        endTime: "2020-6-1",
        site: "广西壮族自治区桂林市临桂区金水路3号"
      },
      total: 30,
      bs: {}
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.contacts, {
        scrollY: true,
        probeType: 3,
        pullUpLoad: true
      });
      this.bs.on("pullingUp", this.pullingUpHandler);
      this.loading = this.bs.hasVerticalScroll ? true : false;
      this.finished = this.bs.hasVerticalScroll ? false : true;
    });
  },
  updated() {
    this.$nextTick(() => {
      this.bs.finishPullUp();
      this.bs.refresh();
    });
  },
  methods: {
    submit() {},
    async pullingUpHandler() {
      if (this.list.length >= this.total) {
        this.finished = true;
        this.loading = false;
      } else {
        const list = this.list.slice(0, 5);
        await setTimeout(() => {
          this.list = this.list.concat(list);
        }, 2000);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.van-tag
  padding 0 0.7em
  margin 0 3px

.van-button
  display block
  width 260px
  text-align center
  margin auto

.contacts__list
  height calc( 100vh - 46px - 54px - 50px )
  overflow hidden

  &.contacts__list--ios
    height calc( 100vh - 46px - 54px - 50px - 75px )

.list__item
  display flex
  justify-content space-around
  align-items center
  padding 5px 0

  .item__avatar
    width 40px
    height 40px

  .item__content
    display inline-flex
    width 260px
    height 50px
    justify-content space-around

    .content__li
      display flex
      flex-direction column
      justify-content space-between

      .li__p
        height 22px
        color #1989fa
        display flex
        align-items center

        .p__strong
          font-size 15px
          line-height 22px
          font-weight 400
          color #152962

        .p__span
          line-height 22px
          color #737392

.contact__header
  border-bottom 10px solid #f2f2f2
  height 100px
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

    .h_area
      font-size 12px
      color #737397

  .header__p
    font-size 14px
    color #737397
</style>
