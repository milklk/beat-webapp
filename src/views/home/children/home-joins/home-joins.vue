<template>
  <section class="joins">
    <!-- eslint-disable-next-line -->
    <article class="joins__list" ref="joins" v-show="$route.path === '/home/joins'">
      <!-- eslint-disable-next-line -->
      <template v-if="list.length">
        <!-- eslint-disable-next-line -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
          <router-link
            v-for="(item, i) in list"
            :key="i"
            :to="{ name: 'home-join', params: { id: item.id } }"
            class="list__item"
          >
            <!-- eslint-disable-next-line -->
            <van-image class="item__img" :src="setPhoto(item.headPhoto)" />
            <article class="item__content">
              <h3 class="content__h">
                <strong class="h__name">{{ item.name }}</strong>
                <span class="h_area">（{{ item.sex }}）</span>
              </h3>
              <p class="content__p">出所日期：{{ item.outTime }}</p>
              <!-- eslint-disable-next-line -->
              <!-- <p class="content__p">经办人：{{ item.agentOrg ? item.agentOrg : '暂无数据' }}</p> -->
              <aside class="content__aside">
                <p class="aside__p">{{ item.idcard }}</p>
                <!-- eslint-disable-next-line -->
                <van-tag type="danger">{{ item.type==='1' ? '社区戒毒' : '社区康复' }}</van-tag>
              </aside>
            </article>
          </router-link>
        </van-list>
      </template>
      <NoData v-else label="暂无衔接" />
    </article>
    <router-view />
  </section>
</template>

<script>
import { joinsList, headPhoto } from "../../../../api";
import { format } from "../../../../utils/date";
import photo from "../../../../assets/img/people-head.png";
import NoData from "../../../../components/no-data";
export default {
  name: "home-joins",
  props: {},
  data() {
    return {
      bs: {},
      loading: true,
      finished: false,
      page: 1,
      list: [],
      total: 0
    };
  },
  components: {
    NoData
  },
  computed: {},
  watch: {
    async $route() {
      this.page = 1;
      const jions = await joinsList(this.page++, 15);
      if (jions.ret === "200") {
        jions.data.list.forEach(d => {
          d.outTime = format(d.outTime);
        });
        this.list = jions.data.list;
        this.total = jions.data.total;
      }
    }
  },
  async created() {
    await this.updateList();
    if (this.total <= 15) {
      this.loading = false;
      this.finished = true;
    }
  },
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.joins, {
        scrollY: true,
        click: true,
        probeType: 3,
        pullUpLoad: true
      });
      this.bs.on("pullingUp", this.pullingUpHandler);
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
        this.updateList();
      }
    },
    setPhoto(attId) {
      const headerImg = attId ? headPhoto(attId) : photo;
      return headerImg;
    },
    async updateList() {
      const jions = await joinsList(this.page++, 15);
      if (jions.ret === "200") {
        jions.data.list.forEach(d => {
          d.outTime = format(d.outTime);
        });
        this.list = this.list.concat(jions.data.list);
        this.total = jions.data.total;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.joins__list
  height calc( 100vh - 46px + 46px )
  overflow hidden

  .list__item
    display flex
    justify-content space-around
    align-items center
    height 50px

    .item__img
      width 36px
      height 36px

    .item__content
      width 300px
      height 42px
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
          width 70px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          display inline-block

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
