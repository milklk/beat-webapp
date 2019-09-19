<template>
  <section class="list">
    <!-- header -->
    <van-cell :title="`未读：${unread}`" class="list__header" v-if="headerShow">
      <template #right-icon>
        <!-- eslint-disable-next-line -->
        <van-icon name="ellipsis" color="#666" size="16" class="header__i" @click="operation" />
      </template>
    </van-cell>
    <!-- 弹出层 -->
    <!-- eslint-disable-next-line -->
    <van-action-sheet v-model="sheetShow" :actions="actions" cancel-text="取消" @select="select" />
    <!-- 列表 -->
    <article
      class="list__content"
      :class="{
        'list__content--noHeader': !headerShow,
        'list__content--footer': $route.meta.footer
      }"
      ref="list"
    >
      <!-- eslint-disable-next-line -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
        <!-- eslint-disable-next-line -->
        <div v-for="(item, i) in list" :key="i" class="content__item" @click="readed(item)">
          <van-image
            class="item__icon"
            :class="{ 'item__icon--not': item.isRead === 0 }"
            :src="require('../../assets/img/list-img.png')"
          />
          <div class="item__main">
            <h3 class="main__h">{{ item.title }}</h3>
            <!-- <p class="main__p" v-html="item.content"></p> -->
          </div>
          <aside class="item__time">{{ item.time }}</aside>
        </div>
      </van-list>
    </article>
  </section>
</template>

<script>
export default {
  name: "list",
  props: {
    children: Object,
    list: Array,
    total: Number,
    unread: Number,
    api: Object,
    headerShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sheetShow: false,
      actions: [{ name: "全部已读" }],
      loading: true,
      finished: false,
      bs: {}
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {
    if (this.total <= 15) {
      this.loading = false;
      this.finished = true;
    }
    //创建bscroll实例，并绑定上拉加载事件
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.list, {
        scrollY: true,
        probeType: 3,
        click: true,
        pullUpLoad: true
      });
      this.bs.on("pullingUp", this.pullingUpHandler);
    });
  },
  updated() {
    this.$nextTick(() => {
      this.bs.finishPullUp();
      this.bs.refresh();
    });
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    //弹出层显示
    operation() {
      this.sheetShow = true;
    },
    async readed(item) {
      if (item.isRead === 0) {
        const read = await this.api.readed(item.id);
        console.log(read);
        if (read.ret === "200") {
          item.isRead = 1;
          const unread = this.unread - 1;
          await this.$emit("update:unread", unread);
          this.$router.push({
            name: this.children.name,
            params: { id: item[this.children.idName] }
          });
        }
      } else {
        this.$router.push({
          name: this.children.name,
          params: { id: item[this.children.idName] }
        });
      }
    },
    //全部已读提交
    async select() {
      this.sheetShow = false;
      if (this.unread !== 0) {
        const read = await this.api.readAll();
        if (read.ret === "200") {
          this.$emit("update:unread", 0);
          this.$toast({ type: "success", message: "全部已读", duration: 700 });
          this.list.forEach(d => {
            d.isRead = 1;
          });
        }
      } else {
        this.$toast({ type: "fail", message: "已全部已读", duration: 700 });
      }
    },
    //上拉加载事件
    async pullingUpHandler() {
      if (this.loading && this.list.length < this.total) {
        await this.$emit("update");
      } else {
        this.loading = false;
        this.finished = true;
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
  height calc( 100vh - 80px + 46px )
  background #fff
  overflow hidden

  .content__item
    display flex
    justify-content space-between
    padding 10px 10px 10px 20px
    height 60px
    border-bottom 1px solid #f2f2f2

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
      justify-content center
      width 210px

      .main__h
        font-size 16px
        font-weight normal

.item__main .main__p, .item__main .main__h
  overflow hidden
  text-overflow ellipsis
  white-space nowrap

.list__content--noHeader
  height calc( 100vh - 46px + 46px )

.list__content--footer
  height calc( 100vh - 130px + 46px )
</style>
