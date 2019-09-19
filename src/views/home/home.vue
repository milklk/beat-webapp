<template>
  <section class="home">
    <template v-if="$route.path === '/home'">
      <h1 class="home__item home__item--h">
        社戒社康中心
        <van-image class="home__img" :src="titlePhoto" />
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
              :icon="action.icon"
              :text="action.text"
              :to="action.to"
            />
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
import { noticesList, personList } from "../../api";
import { format } from "../../utils/date";
export default {
  name: "home",
  props: {},
  data() {
    return {
      notices: [],
      titlePhoto: require("../../assets/img/approve-head.jpg"),
      actions: [
        {
          icon: require("../../assets/img/action-1.png"),
          text: "衔接",
          to: "/home/joins"
        },
        {
          icon: require("../../assets/img/action-2.png"),
          text: "通讯录",
          to: "/contacts"
        },
        {
          icon: require("../../assets/img/action-3.png"),
          text: "审批",
          to: "/home/approves"
        },
        {
          icon: require("../../assets/img/action-4.png"),
          text: "移交",
          to: "/home/hands"
        }
      ],
      approves: [
        {
          text: "低风险人员张小莉的地址变更审批",
          time: "2019-08-19",
          state: 1,
          id: "1"
        },
        {
          text: "低风险人员张小莉的外出请假审批",
          time: "2019-08-18",
          state: 0,
          id: "2"
        }
      ],
      personnel: [],
      personnelSum: 0
    };
  },
  components: {},
  computed: {},
  async created() {
    const notices = await noticesList(1, 2);
    if (notices.ret === "200") {
      notices.data.list.forEach(d => {
        d.time = format(d.updateTime);
      });
      this.notices = notices.data.list;
    }
  },
  async mounted() {
    const person = await personList();
    if (person.ret === "200") {
      const data = person.data[0];
      this.personnel = [
        { name: `高风险：${data.hlevel}人`, value: data.hlevel },
        { name: `中风险：${data.mlevel}人`, value: data.mlevel },
        { name: `低风险：${data.llevel}人`, value: data.llevel },
        { name: `未报到：${data.noreport}人`, value: data.noreport },
        { name: `脱失：${data.lose}人`, value: data.lose }
      ];
      this.personnelSum =
        data.hlevel + data.mlevel + data.llevel + data.noreport + data.lose;
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
  padding-bottom 0
  height 120px

  .item__h--actions
    padding-bottom 0

.home__item--approves
  margin-bottom 0

.item__personnel
  height 200px
  padding 0 15px

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
