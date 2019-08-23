<template>
  <section class="list">
    <!-- header -->
    <van-cell :title="`未读：${total}`" class="list__header">
      <template #right-icon>
        <!-- eslint-disable-next-line -->
        <van-icon name="ellipsis" color="#666" size="16" class="header__i" @click="operation" />
      </template>
    </van-cell>
    <!-- 弹出层 -->
    <!-- eslint-disable-next-line -->
    <van-action-sheet v-model="sheetShow" :actions="actions" cancel-text="取消" @select="select" />
    <!-- 列表 -->
    <article class="list__content" ref="list">
      <!-- eslint-disable-next-line -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
        <!-- eslint-disable-next-line -->
        <router-link
          v-for="(item, i) in list"
          :key="i"
          :to="{ name: 'home-notice', params: { id: 1 } }"
          class="content__item"
        >
          <van-image
            class="item__icon"
            :class="{ 'item__icon--not': !item.status }"
            :src="require('../../assets/img/list-img.png')"
          />
          <div class="item__main">
            <h3 class="main__h">{{ item.title }}</h3>
            <p class="main__p">{{ item.content }}</p>
          </div>
          <aside class="item__time">{{ item.time }}</aside>
        </router-link>
      </van-list>
    </article>
  </section>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "list",
  props: {},
  data() {
    return {
      sheetShow: false,
      actions: [{ name: "全部已读" }],
      loading: true,
      finished: false,
      total: 2,
      list: [
        {
          title: "通知公告",
          content: "国务院“互联网+督查”平台日前开通群众表示认可",
          time: "2019-07-19",
          status: 0
        },
        {
          title: "通知公告",
          content: "桂林市公安局网站域名变更的通知",
          time: "2019-06-29",
          status: 0
        },
        {
          title: "通知公告",
          content: "市局召开桂林公安社会服务平台建设工作情况汇报会议",
          time: "2019-06-19",
          status: 1
        },
        {
          title: "通知公告",
          content: "国务院发布一系列促进深化改革的措施",
          time: "2019-05-29",
          status: 1
        },
        {
          title: "通知公告",
          content: "桂林市公安局网站建设情况的通知",
          time: "2019-05-09",
          status: 1
        },
        {
          title: "通知公告",
          content: "国务院“互联网+督查”平台日前开通群众表示认可",
          time: "2019-07-19",
          status: 0
        },
        {
          title: "通知公告",
          content: "桂林市公安局网站域名变更的通知",
          time: "2019-06-29",
          status: 0
        },
        {
          title: "通知公告",
          content: "市局召开桂林公安社会服务平台建设工作情况汇报会议",
          time: "2019-06-19",
          status: 1
        },
        {
          title: "通知公告",
          content: "国务院发布一系列促进深化改革的措施",
          time: "2019-05-29",
          status: 1
        },
        {
          title: "通知公告",
          content: "桂林市公安局网站建设情况的通知",
          time: "2019-05-09",
          status: 1
        }
      ],
      bs: {}
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.list, {
        scrollY: true,
        probeType: 3,
        pullUpLoad: true
      });
      this.bs.on("pullingUp", this.pullingUpHandler);
    });
  },
  methods: {
    operation() {
      this.sheetShow = true;
    },
    select() {
      this.sheetShow = false;
      this.$toast({ type: "success", message: "全部已读", duration: 500 });
    },
    async pullingUpHandler() {
      if (this.list.length >= 20) {
        this.finished = true;
        this.loading = false;
      } else {
        const list = this.list.slice(0, 5);
        await setTimeout(() => {
          this.list = this.list.concat(list);
          this.$nextTick(() => {
            this.bs.finishPullUp();
            this.bs.refresh();
          });
        }, 2000);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.list__header
  background #f2f2f2
  padding 5px 10px
  font-size 14px
  font-weight bold
  color #666
  line-height 20px

  .header__i
    font-weight 700
    transform translateY( 3px )

.list__content
  height calc( 100vh - 80px )
  background #fff
  overflow hidden

  .content__item
    display flex
    justify-content space-between
    padding 10px 10px 10px 20px
    height 60px

    .item__icon
      width 40px
      height 40px
      align-self center

    .item__icon--not::before
      position absolute
      top 0
      bottom 0
      left -8px
      margin auto
      width 5px
      height 5px
      background-color #f44
      border-radius 50%
      content ' '

    .item__main
      display flex
      flex-direction column
      justify-content space-between
      width 210px

      .main__h
        font-size 16px
        font-weight normal
        overflow hidden
        text-overflow ellipsis
        white-space nowrap

      .main__p
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>
