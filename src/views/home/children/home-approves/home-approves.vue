<template>
  <section class="approves">
    <!-- eslint-disable-next-line -->
    <van-tabs
      v-if="$route.path === '/home/approves'"
      v-model="active"
      line-width="50%"
      title-active-color="#09f"
    >
      <!-- eslint-disable-next-line -->
      <van-tab v-for="(tab, i) in tabs" :key="i" :title="tab.title" :name="tab.status">
        <van-search
          placeholder="请输入搜索关键词"
          v-model="keyword[tab.status]"
          shape="round"
          background="#fff"
          @search="search"
        />
        <article class="approves__list" ref="content">
          <!-- eslint-disable-next-line -->
          <van-list
            v-model="loading[tab.status]"
            :finished="finished[tab.status]"
            finished-text="没有更多了"
            :immediate-check="false"
          >
            <router-link
              v-for="(item, i) in tab.data"
              :key="i"
              :to="{
                name: 'home-approve',
                params: { status: tab.status, id: item.id }
              }"
              class="list__item"
              :class="item.status === 0 ? '' : item.status === 1 ? 'success' : 'danger'"
            >
              <van-image
                class="item__img"
                round
                fit="cover"
                :src="require('../../../../assets/img/approve-head.jpg')"
              />
              <article class="item__content">
                <header class="content__header">
                  <h3 class="content__h">
                    <strong class="h__name">{{ item.name }}</strong>
                    <span class="h_area">（{{ item.sex }}）</span>
                  </h3>
                </header>
                <p class="content__p">请假事由：{{ item.reason }}</p>
                <p class="content__p">开始时间：{{ item.startTime }}</p>
                <p class="content__p">结束时间：{{ item.endTime }}</p>
                <p class="content__p content__p--status">
                  <!-- eslint-disable-next-line -->
                  {{ item.status === 0 ? "待审批" : item.status === 1 ? '审批通过' : '审批拒绝' }}
                </p>
              </article>
              <aside class="item__time">{{ item.time }}</aside>
            </router-link>
          </van-list>
        </article>
      </van-tab>
    </van-tabs>
    <router-view />
  </section>
</template>

<script>
import { approvesList } from "../../../../api";
import { format } from "../../../../utils/date";
export default {
  name: "home-approves",
  props: {},
  data() {
    return {
      active: "dandelion",
      value: "",
      dandelion: [],
      approval: [],
      keyword: {
        dandelion: "",
        approval: ""
      },
      bs: {
        dandelion: null,
        approval: null
      },
      loading: {
        dandelion: true,
        approval: true
      },
      finished: {
        dandelion: false,
        approval: false
      },
      total: {
        dandelion: 0,
        approval: 0
      },
      page: {
        dandelion: 1,
        approval: 1
      }
    };
  },
  components: {},
  computed: {
    tabs() {
      return [
        {
          title: "待我审批的",
          status: "dandelion",
          data: this.dandelion
        },
        {
          title: "我已审批的",
          status: "approval",
          data: this.approval
        }
      ];
    }
  },
  watch: {
    $route() {
      this.search();
    }
  },
  async created() {
    await this.updatedList();
    const status = this.active;
    if (this[status].length < 15) {
      this.loading[status] = false;
      this.finished[status] = true;
    }
  },
  mounted() {
    if (this.$route.path === "/home/approves") {
      this.$nextTick(() => {
        this.$_setBScroll("dandelion", 0);
      });
    }
  },
  updated() {
    if (this.$route.path === "/home/approves") {
      this.$nextTick(() => {
        if (!this.bs.dandelion && this.$refs.content.length === 1) {
          this.$_setBScroll("dandelion", 0);
        }
        if (!this.bs.approval && this.$refs.content.length === 2) {
          this.search();
          this.$_setBScroll("approval", 1);
        }
        this.bs[this.active].finishPullUp();
        this.bs[this.active].refresh();
      });
    }
  },
  methods: {
    async search() {
      const status = this.active;
      this[status] = [];
      await this.updatedList();
      if (this[status].length < 15) {
        this.loading[status] = false;
        this.finished[status] = true;
      }
    },
    pullingUpHandler() {
      const status = this.active;
      if (this[status].length < this.total[status]) {
        this.updatedList();
      } else {
        this.loading[status] = false;
        this.finished[status] = true;
      }
    },
    $_setBScroll(status, index) {
      const BScroll = this.$BScroll;
      this.bs[status] = new BScroll(this.$refs.content[index], {
        scrollY: true,
        probeType: 3,
        click: true,
        pullUpLoad: true
      });
      this.bs[status].on("pullingUp", this.pullingUpHandler);
      this.loading[status] = this.bs[status].hasVerticalScroll ? true : false;
      this.finished[status] = this.bs[status].hasVerticalScroll ? false : true;
    },
    async updatedList() {
      const status = this.active;
      switch (status) {
        case "dandelion":
          {
            const list = await approvesList(
              this.page.dandelion++,
              15,
              1,
              this.keyword.dandelion
            );
            if (list.ret === "200") {
              list.data.list.forEach(d => {
                d.startTime = format(d.startTime);
                d.endTime = format(d.endTime);
                d.time = format(d.leaveTime);
              });
              this.dandelion = this.dandelion.concat(list.data.list);
              this.total.dandelion = list.data.total;
            }
          }
          break;
        case "approval":
          {
            const list = await approvesList(
              this.page.approval++,
              15,
              2,
              this.keyword.approval
            );
            if (list.ret === "200") {
              list.data.list.forEach(d => {
                d.startTime = format(d.startTime);
                d.endTime = format(d.endTime);
                d.time = format(d.leaveTime);
              });
              this.approval = this.approval.concat(list.data.list);
              this.total.approval = list.data.total;
            }
          }
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.van-tag
  padding 0 0.7em

.success
  background url( '../../../../assets/img/success.png' ) right 60% / 32.67vw 26.67vw no-repeat

.danger
  background url( '../../../../assets/img/danger.png' ) right 60% / 32.67vw 26.67vw no-repeat

.approves__list
  height calc( 100vh - 145px )
  overflow hidden

  .list__item
    display flex
    justify-content space-around
    align-items flex-start
    height 120px
    padding 10px

    .item__img
      width 36px
      height 36px

    .item__content
      width 200px
      height 100px
      display flex
      flex-direction column
      justify-content space-between
      position relative
      top 0
      left 0

      .content__header
        display flex
        justify-content space-between

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

      .content__p--status
        color #09f
</style>
