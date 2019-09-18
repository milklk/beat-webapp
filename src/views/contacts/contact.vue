<template>
  <ul class="contact">
    <li class="contact__item">
      <header class="item__h">
        <van-icon name="apps-o" size="22" color="#1989fa" />
        <h2 class="h_title">常用功能</h2>
      </header>
      <van-grid :column-num="5">
        <!-- eslint-disable-next-line -->
        <van-grid-item v-for="(action, i) in actions" :key="i" :text="action.text" :to="action.to">
          <template #icon>
            <i class="iconfont" :class="`iconfont ${action.icon}`"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </li>
    <li class="contact__item">
      <header class="item__h">
        <van-icon name="apps-o" size="22" color="#1989fa" />
        <h2 class="h_title">相关记录</h2>
      </header>
      <!-- eslint-disable-next-line -->
      <router-link v-for="(item, i) in routes" :key="i" :to="item.to" class="router">
        <h3 class="router__h">
          <div class="h__title">{{ item.title }}</div>
        </h3>
        <article class="router__content" v-if="item.title !== '工作小组'">
          <h3 class="content__h">共计{{ item.title }} {{ item.count }}次</h3>
          <p class="content__p">
            <!-- eslint-disable-next-line -->
            最近一次{{ item.title }}时间：{{ item.time ? item.time : '无' }}
          </p>
        </article>
        <!-- <article class="router__content" v-else>
          <h3 class="content__h">家属联系电话 {{ item.phone }}</h3>
          <p class="content__p">工作小组：{{ item.count }}人</p>
        </article>-->
      </router-link>
    </li>
  </ul>
</template>

<script>
import { archivesRecordAll } from "../../api";
import { format } from "../../utils/date";
export default {
  name: "contact",
  props: {},
  data() {
    const id = this.$route.params.id;
    return {
      actions: [
        {
          text: "签到",
          icon: "iconxieyi-copy",
          to: { name: "contact-sign-in", params: { id: id } }
        },
        {
          text: "尿检",
          icon: "iconniaojiandengji",
          to: { name: "contact-urinalysis", params: { id: id } }
        },
        {
          text: "谈话",
          icon: "icontanhuahanxun",
          to: { name: "contact-talk", params: { id: id } }
        },
        {
          text: "拜访",
          icon: "iconbaifang",
          to: { name: "contact-visit", params: { id: id } }
        },
        {
          text: "请假",
          icon: "iconleave",
          to: { name: "contact-leave", params: { id: id } }
        },
        {
          text: "评估",
          icon: "iconpinggu",
          to: { name: "contact-assess", params: { id: id } }
        },
        {
          text: "帮扶救助",
          icon: "iconbangfujihua",
          to: { name: "contact-helping", params: { id: id } }
        },
        {
          text: "违反协议",
          icon: "iconxieyi-copy",
          to: { name: "contact-agreement", params: { id: id } }
        },
        {
          text: "查找脱失",
          icon: "iconchazhaobiaodanliebiao",
          to: { name: "contact-find", params: { id: id } }
        },
        {
          text: "药物维持",
          icon: "iconyaowu",
          to: { name: "contact-drugs", params: { id: id } }
        }
        // {
        //   text: "工作小组",
        //   icon: "icongongzuoxiaozu",
        //   to: { name: "contact-party", params: { id: id } }
        // }
      ],
      routes: [
        {
          title: "签到",
          count: 0,
          time: "",
          to: { name: "contact-record", params: { header: "签到记录", id } }
        },
        {
          title: "尿检",
          count: 0,
          time: "",
          to: {
            name: "contact-record",
            params: { header: "尿检记录", id: id }
          }
        },
        {
          title: "谈话",
          count: 0,
          time: "",
          to: {
            name: "contact-record",
            params: { header: "谈话记录", id: id }
          }
        },
        {
          title: "拜访",
          count: 0,
          time: "",
          to: {
            name: "contact-record",
            params: { header: "拜访记录", id: id }
          }
        },
        {
          title: "请假",
          count: 0,
          time: "",
          to: {
            name: "contact-record",
            params: { header: "请假记录", id: id }
          }
        },
        {
          title: "评估",
          count: 0,
          time: "",
          to: {
            name: "contact-record",
            params: { header: "评估记录", id: id }
          }
        },
        {
          title: "帮扶救助",
          count: 0,
          time: "",
          to: {
            name: "contact-record",
            params: { header: "帮扶救助记录", id: id }
          }
        },
        {
          title: "违反协议",
          count: 0,
          time: "",
          to: {
            name: "contact-record",
            params: { header: "违反协议记录", id: id }
          }
        },
        {
          title: "查找脱失",
          count: 0,
          time: "",
          to: {
            name: "contact-record",
            params: { header: "查找脱失记录", id: id }
          }
        },
        {
          title: "药物维持",
          count: 0,
          time: "",
          to: {
            name: "contact-record",
            params: { header: "药物维持记录", id: id }
          }
        }
        // {
        //   title: "工作小组",
        //   phone: "13012341234",
        //   count: 5,
        //   to: {
        //     name: "contact-record",
        //     params: { header: "工作小组记录", id: id }
        //   }
        // }
      ]
    };
  },
  components: {},
  computed: {},
  async created() {
    const code = [
      "sign",
      "urine",
      "talk",
      "visit",
      "leave",
      "assess",
      "help",
      "violation",
      "find",
      "medication"
    ];
    const id = this.$route.params.id;
    const records = await archivesRecordAll(id);
    if (records.ret === "200") {
      const data = records.data[0];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const i = code.findIndex(cod => key.indexOf(cod) === 0);
          if (i !== -1) {
            if (key.indexOf("Count") !== -1) {
              this.routes[i].count = data[key];
            } else if (key.indexOf("Time") !== -1) {
              this.routes[i].time = format(data[key]);
            }
          }
        }
      }
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.iconfont
  font-size 7.47vw
  margin-bottom 3px

.contact__item
  background #fff
  padding 10px 0 15px
  border-bottom 10px solid #f2f2f2

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
      font-size 16px

.router
  display flex
  justify-content space-around
  align-items center
  height 70px
  padding 5px

  .router__h
    width 50px
    height 50px
    font-size 14px
    font-weight normal
    border 2px solid #ccc
    border-radius 50%
    display flex
    align-items center
    justify-content center
    text-align center
    line-height 19px

    .h__title
      width 30px

  .router__content
    width 260px
    height 50px
    padding-left 40px
    border-left 2px solid #ccc
    display flex
    flex-direction column
    justify-content space-between

    .content__h
      font-size 16px
      font-weight normal
      line-height 20px

    .content__p
      color #737397
      font-size 13px
      line-height 16px
</style>
