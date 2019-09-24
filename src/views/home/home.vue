<template>
  <section class="home">
    <template v-if="$route.path === '/home'">
      <h1 class="home__item home__item--h">
        社戒社康中心
        <!-- <img :src="titlePhoto.src" /> -->
        <van-image class="home__img" :src="titlePhoto.src" />
      </h1>
      <ul class="home__content">
        <!-- 公告信息 -->
        <li class="home__item">
          <header class="item__h">
            <van-icon name="volume-o" size="22" color="#1989fa" />
            <h2 class="h_title">公告信息</h2>
            <!-- eslint-disable-next-line -->
            <router-link to="/home/notices" class="h__route">全部公告</router-link>
          </header>
          <template v-if="notices.length">
            <router-link
              v-for="(notice, i) in notices"
              :key="i"
              :to="{ name: 'home-notice', params: { id: notice.noticeId } }"
            >
              <!-- eslint-disable-next-line -->
              <van-notice-bar left-icon="volume-o" :scrollable="false" :text="notice.title">
                <template #right-icon>{{ notice.time }}</template>
              </van-notice-bar>
            </router-link>
          </template>
          <van-divider v-else class="van-divider">暂无公告</van-divider>
        </li>
        <!-- 常用功能 -->
        <li class="home__item home__item--actions">
          <header class="item__h item__h--actions">
            <van-icon name="apps-o" size="22" color="#1989fa" />
            <h2 class="h_title">常用功能</h2>
          </header>
          <van-grid :border="false">
            <van-grid-item
              v-for="(action, i) in actions"
              :key="i"
              :text="action.text"
              :to="action.to"
            >
              <template #icon>
                <!-- eslint-disable-next-line -->
                <van-icon
                  v-if="info[action.info]"
                  :name="action.icon"
                  :info="info[action.info]"
                  size="40"
                  class="img-icon"
                />
                <!-- eslint-disable-next-line -->
                <van-icon v-else :name="action.icon" size="40" class="img-icon" />
              </template>
            </van-grid-item>
          </van-grid>
        </li>
        <!-- 审批事项 -->
        <!-- <li class="home__item home__item--approves">
          <header class="item__h">
            <van-icon name="completed" size="22" color="#1989fa" />
            <h2 class="h_title">审批事项</h2>
     
            <router-link to="/home/approves" class="h__route">全部待办</router-link>
          </header>
          <router-link
            v-for="(approve, i) in approves"
            :key="i"
            :to="{
              name: 'home-approve',
              params: { status: 'dandelion', id: approve.id }
            }"
          >
       
            <van-notice-bar background="#fff" :scrollable="false" :text="approve.text">
              <template #left-icon>
            
                <van-tag v-if="approve.state" key="true" mark type="success" class="van-tag__left">
         
                  已审批
                </van-tag>
          
                <van-tag v-else key="false" mark class="van-tag__left">未审批</van-tag>
              </template>
              <template #right-icon>
                <div class="van-tag__right">{{ approve.time }}</div>
              </template>
            </van-notice-bar>
          </router-link>
        </li>-->
        <!-- 人员总览 -->
        <li class="home__item home__personnel">
          <header class="item__h item__h--actions">
            <van-icon name="chart-trending-o" size="22" color="#1989fa" />
            <h2 class="h_title">人员总览</h2>
            <aside class="h_aside">总人数：{{ personnelSum }}</aside>
          </header>
          <div class="item__personnel" ref="personnel"></div>
        </li>
      </ul>
    </template>
    <router-view v-else />
  </section>
</template>

<script>
import {
  noticesList,
  personList,
  joinsList,
  approvesList,
  archives,
  workReceptionList
} from "../../api";
import { format } from "../../utils/date";
export default {
  name: "home",
  props: {},
  data() {
    return {
      notices: [],
      titlePhoto: { src: require("../../assets/img/title.png") },
      actions: [
        {
          icon: require("../../assets/img/action-1.png"),
          text: "衔接",
          to: "/home/joins",
          info: "joins"
        },
        {
          icon: require("../../assets/img/action-3.png"),
          text: "审批",
          to: "/home/approves",
          info: "approves"
        },
        {
          icon: require("../../assets/img/action-4.png"),
          text: "移交",
          to: "/home/hands",
          info: "hands"
        },
        {
          icon: require("../../assets/img/action-2.png"),
          text: "接收",
          to: "/home/sends",
          info: "sends"
        }
      ],
      approves: [],
      personnel: [],
      personnelSum: 0,
      info: {
        joins: 0,
        approves: 0,
        hands: 0,
        sends: 0
      }
    };
  },
  components: {},
  computed: {},
  watch: {
    $route(to) {
      if (to.path === "/home") {
        this.$_created();
      }
    }
  },
  async created() {
    this.$_created();
  },
  async mounted() {
    const person = await personList();
    if (person.ret === "200") {
      const data = person.data.data;
      this.personnel = [
        { name: `高风险：${data.hlevel}人`, value: data.hlevel },
        { name: `中风险：${data.mlevel}人`, value: data.mlevel },
        { name: `低风险：${data.llevel}人`, value: data.llevel },
        { name: `未评估：${data.nolevel}人`, value: data.nolevel }
      ];
      this.personnelSum =
        data.hlevel + data.mlevel + data.llevel + data.nolevel;
      this.setPersonnelEcharts();
    }
  },
  updated() {
    this.setPersonnelEcharts();
  },
  methods: {
    setPersonnelEcharts() {
      if (this.$refs.personnel) {
        const personnelEcharts = this.$echarts.init(this.$refs.personnel);
        const personnelData = this.personnel;
        const now = new Date();
        const time = format(now, "MM-dd--zh");
        const personnelOption = {
          title: {
            text: time,
            textStyle: {
              fontWeight: "normal",
              fontSize: "14"
            },
            left: "15%",
            top: "45%"
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "65%",
            y: "center",
            data: personnelData.map(d => `${d.name}`)
          },
          series: [
            {
              name: "人员总览",
              type: "pie",
              radius: ["50%", "70%"],
              center: ["25%", "50%"],
              avoidLabelOverlap: false,
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: personnelData
            }
          ]
        };
        personnelEcharts.setOption(personnelOption);
      }
    },
    async $_created() {
      const notices = await noticesList(1, 2);
      if (notices.ret === "200") {
        notices.data.list.forEach(d => {
          d.time = format(d.updateTime, "yyyy-MM-dd HH:mm");
        });
        this.notices = notices.data.list;
      }
      const jions = await joinsList(1, 1);
      if (jions.ret === "200") {
        jions.data.list.forEach(d => {
          d.outTime = format(d.outTime);
        });
        this.info.joins = jions.data.total;
      }
      const approves = await approvesList(1, 1, 1);
      if (approves.ret === "200") {
        this.info.approves = approves.data.total;
      }
      const hands = await archives(1, 1);
      if (hands.ret === "200") {
        this.info.hands = hands.data.total;
      }
      const sends = await workReceptionList(1, 1);
      if (sends.ret === "200") {
        this.info.sends = sends.data.total;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.home__item
  margin-bottom 10px
  background #fff
  padding 10px 0 15px

  .item__h
    display flex
    justify-content flex-start
    align-items center
    padding 0 15px 15px
    position relative
    top 0
    left 0

    .h_title
      padding-left 10px
      font-weight 700

    .h__route
      position absolute
      right 15px

    .h_aside
      position absolute
      right 15px
      top 5px
      color red

.home__item--h
  font-size 16px
  font-weight bold
  line-height 34px
  padding 15px
  height 181px
  margin-bottom 0

  .home__img
    width 345px
    height 117px

.home__item--actions
  height 138px

  .item__h--actions
    padding-bottom 0

.home__item--approves
  margin-bottom 0

.item__personnel
  height 200px
  padding 0 15px
  width 100vw

.van-tag__left
  margin-right 5px

.van-tag__right
  margin-left 5px

.van-divider
  color #999999
  padding 0 16px
  margin 5px 0

.home__content
  padding-top 15px
  background #f2f2f2
  padding-bottom 1px
</style>
