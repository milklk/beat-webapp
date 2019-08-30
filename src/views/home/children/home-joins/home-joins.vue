<template>
  <section class="joins">
    <!-- eslint-disable-next-line -->
    <article
      class="joins__list"
      :class="{ 'joins__list--ios': $userAgent === 'ios' }"
      ref="joins"
      v-show="$route.path === '/home/joins'"
    >
      <!-- eslint-disable-next-line -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
        <router-link
          v-for="(item, i) in list"
          :key="i"
          :to="{ name: 'home-join', params: { id: 1 } }"
          class="list__item"
        >
          <!-- eslint-disable-next-line -->
          <van-image class="item__img" :src="require('../../../../assets/img/people-head.png')" />
          <article class="item__content">
            <h3 class="content__h">
              <strong class="h__name">{{ item.name }}</strong>
              <span class="h_area">（{{ item.area }}）</span>
            </h3>
            <p class="content__p">强戒结束日期：{{ item.endTime }}</p>
            <!-- eslint-disable-next-line -->
            <p class="content__p">经办人：{{ item.principal }} 电话：{{item.phone}}</p>
            <aside class="content__aside">
              <p class="aside__p">{{ item.agency }}</p>
              <van-tag v-if="item.risk === 30" type="danger">高风险</van-tag>
              <!-- eslint-disable-next-line -->
              <van-tag v-else-if="item.risk === 20" color="rgb(255, 153, 0)">中风险</van-tag>
              <van-tag v-else type="success">低风险</van-tag>
            </aside>
          </article>
        </router-link>
      </van-list>
    </article>
    <router-view />
  </section>
</template>

<script>
export default {
  name: "home-joins",
  props: {},
  data() {
    return {
      bs: {},
      loading: true,
      finished: false,
      list: [
        {
          name: "张怀志",
          area: "临桂区",
          endTime: "2019-10-1 11:00",
          principal: "张向阳",
          phone: "18907711179",
          agency: "桂林市强戒所",
          risk: 20
        },
        {
          name: "赵德意",
          area: "临桂区",
          endTime: "2019-10-12 11:00",
          principal: "李楠楠",
          phone: "18207711991",
          agency: "南宁市强戒所",
          risk: 30
        },
        {
          name: "喵喵喵",
          area: "临桂区",
          endTime: "2019-10-22 11:00",
          principal: "汪汪汪",
          phone: "18202341789",
          agency: "钦州市强戒所",
          risk: 10
        },
        {
          name: "张怀志",
          area: "临桂区",
          endTime: "2019-10-1 11:00",
          principal: "张向阳",
          phone: "18907711179",
          agency: "桂林市强戒所",
          risk: 20
        },
        {
          name: "赵德意",
          area: "临桂区",
          endTime: "2019-10-12 11:00",
          principal: "李楠楠",
          phone: "18207711991",
          agency: "南宁市强戒所",
          risk: 30
        },
        {
          name: "喵喵喵",
          area: "临桂区",
          endTime: "2019-10-22 11:00",
          principal: "汪汪汪",
          phone: "18202341789",
          agency: "钦州市强戒所",
          risk: 10
        },
        {
          name: "张怀志",
          area: "临桂区",
          endTime: "2019-10-1 11:00",
          principal: "张向阳",
          phone: "18907711179",
          agency: "桂林市强戒所",
          risk: 20
        },
        {
          name: "赵德意",
          area: "临桂区",
          endTime: "2019-10-12 11:00",
          principal: "李楠楠",
          phone: "18207711991",
          agency: "南宁市强戒所",
          risk: 30
        },
        {
          name: "喵喵喵",
          area: "临桂区",
          endTime: "2019-10-22 11:00",
          principal: "汪汪汪",
          phone: "18202341789",
          agency: "钦州市强戒所",
          risk: 10
        }
      ],
      total: 20
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.joins, {
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
    if (this.$route.path === "/home/joins") {
      this.$nextTick(() => {
        this.bs.finishPullUp();
        this.bs.refresh();
      });
    }
  },
  methods: {
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
.joins__list
  height calc( 100vh - 46px )
  overflow hidden

  &.joins__list--ios
    height calc( 100vh - 46px - 75px )

  .list__item
    display flex
    justify-content space-around
    align-items center
    height 100px

    .item__img
      width 36px
      height 36px

    .item__content
      width 300px
      height 80px
      padding-left 20px
      border-left 2px solid #ccc
      display flex
      flex-direction column
      justify-content space-between
      position relative
      top 0
      left 0

      .content__h
        font-weight normal

        .h__name
          font-size 16px
          font-weight normal
          color #152952

        .h_area
          font-size 12px
          color #737397

      .content__p
        font-size 14px
        color #737397

      .content__aside
        position absolute
        top 0
        right 0
        text-align right

        .aside__p
          font-size 12px
          color #737397
          margin-bottom 10px
</style>
