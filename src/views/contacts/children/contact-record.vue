<template>
  <div>
    <van-cell-group class="van-cell-group">
      <van-cell :title="`新增${route.text}`" :to="route.to" is-link />
    </van-cell-group>
    <section class="record">
      <!-- eslint-disable-next-line -->
      <van-steps direction="vertical" :active="0" active-icon="checked" v-if="show">
        <!-- 签到记录 -->
        <template v-if="$route.params.header === '签到记录'">
          <van-step v-for="(item, i) in signIn" :key="i">
            <header class="van-step__header">
              <!-- eslint-disable-next-line -->
              <p class="header__p">{{ name }}签到（社工{{ realname }}代签)</p>
              <p class="header__p">{{ item.signTime }}</p>
            </header>
            <article class="van-step__article">
              <van-icon name="map-marked" size="16" class="van-icon" />
              <p>{{ item.signAddress }}</p>
            </article>
          </van-step>
        </template>
        <!-- 尿检记录 -->
        <template v-if="$route.params.header === '尿检记录'">
          <van-step v-for="(item, i) in urinalysis" :key="i">
            <header class="van-step__header">
              <!-- eslint-disable-next-line -->
              <p class="header__p">{{ item.checkResult === 0 ? '阳性' : '阴性' }}（社工{{ realname }}代上传)</p>
              <p class="header__p">{{ item.checkTime }}</p>
            </header>
            <article class="van-step__article">
              <van-icon name="map-marked" size="16" class="van-icon" />
              <p>尿检地点：{{ item.checkAddress }}</p>
            </article>
          </van-step>
        </template>
        <!-- 谈话记录 -->
        <template v-if="$route.params.header === '谈话记录'">
          <van-step v-for="(item, i) in talk" :key="i">
            <header class="van-step__header">
              <!-- eslint-disable-next-line -->
              <p class="header__p">谈话渠道{{ item.talkMode }}（社工{{ realname }}代签)</p>
              <p class="header__p">{{ item.talkTime }}</p>
            </header>
            <article class="van-step__article">
              <p>{{ item.talkContent }}</p>
            </article>
          </van-step>
        </template>
        <!-- 拜访记录 -->
        <template v-if="$route.params.header === '拜访记录'">
          <van-step v-for="(item, i) in visit" :key="i">
            <header class="van-step__header">
              <!-- eslint-disable-next-line -->
              <p class="header__p">同行人员:{{ item.colleagueUser ? item.colleagueUser : '无' }}</p>
              <p class="header__p">{{ item.visitTime }}</p>
            </header>
            <article class="van-step__article">
              <p>{{ item.visitContent }}</p>
            </article>
          </van-step>
        </template>
        <!-- 请假记录 -->
        <template v-if="$route.params.header === '请假记录'">
          <van-step v-for="(item, i) in leave" :key="i">
            <header class="van-step__header">
              <p class="header__p">{{ item.reason }}</p>
              <!-- eslint-disable-next-line -->
              <p class="header__p">
                <!-- eslint-disable-next-line -->
                {{ item.status === 0 ? "待审批" : item.status === 1 ? '审批通过' : '审批拒绝' }}
              </p>
            </header>
            <article class="van-step__article">
              <p>起止日期：{{ item.startTime }} 至 {{ item.startTime }}</p>
            </article>
          </van-step>
        </template>
        <!-- 评估记录 -->
        <template v-if="$route.params.header === '评估记录'">
          <van-step v-for="(item, i) in assess" :key="i">
            <header class="van-step__header">
              <!-- eslint-disable-next-line -->
              <p class="header__p">评估小组成员：{{ item.colleagueUser ? item.colleagueUser : '无' }}</p>
              <p class="header__p">{{ item.assessTime }}</p>
            </header>
            <article class="van-step__article">
              <p>{{ item.assessRemark }}</p>
            </article>
          </van-step>
        </template>
        <!-- 帮扶救助记录 -->
        <template v-if="$route.params.header === '帮扶救助记录'">
          <van-step v-for="(item, i) in helping" :key="i">
            <header class="van-step__header">
              <p class="header__p">社工姓名：{{ realname }}</p>
              <p class="header__p">{{ item.helpTime }}</p>
            </header>
            <article class="van-step__article">
              <p>{{ item.helpContent }}</p>
            </article>
          </van-step>
        </template>
        <!-- 告诫信息记录 -->
        <template v-if="$route.params.header === '告诫信息记录'">
          <van-step v-for="(item, i) in agreement" :key="i">
            <header class="van-step__header">
              <!-- eslint-disable-next-line -->
              <p class="header__p">社工姓名：{{ realname }}</p>
              <p class="header__p">{{ item.violationTime }}</p>
            </header>
            <article class="van-step__article">
              <p>{{ item.violationContent }}</p>
            </article>
          </van-step>
        </template>
        <!-- 查找脱失记录 -->
        <template v-if="$route.params.header === '查找脱失记录'">
          <van-step v-for="(item, i) in find" :key="i">
            <header class="van-step__header">
              <!-- eslint-disable-next-line -->
              <p class="header__p">同行人员:{{ item.colleagueUser ? item.colleagueUser : '无' }}</p>
              <p class="header__p">{{ item.findTime }}</p>
            </header>
            <article class="van-step__article">
              <p>{{ item.findContent }}</p>
            </article>
          </van-step>
        </template>
        <!-- 药物维持记录 -->
        <template v-if="$route.params.header === '药物维持记录'">
          <van-step v-for="(item, i) in drugs" :key="i">
            <header class="van-step__header">
              <!-- eslint-disable-next-line -->
              <p class="header__p">{{ item.medicineName }}(主治医师：{{item.doctor}})</p>
              <p class="header__p">{{ item.medicineTime }}</p>
            </header>
            <article class="van-step__article">
              <van-icon name="map-marked" size="16" class="van-icon" />
              <p>治疗地点：{{ item.treatArea }}</p>
            </article>
          </van-step>
        </template>
      </van-steps>
      <NoData v-else :label="`暂无${$route.params.header}`" />
    </section>
  </div>
</template>

<script>
import {
  archivesDetail,
  mineDetail,
  personSignRecord,
  urineRecord,
  personTalkRecord,
  personVisitRecord,
  personLeaveRecord,
  personAssessRecord,
  personHelpRecord,
  personViolationRecord,
  personFindRecord,
  personMedicationRecord
} from "../../../api";
import { format } from "../../../utils/date";
import NoData from "../../../components/no-data";
export default {
  name: "contact-record",
  props: {},
  data() {
    const id = this.$route.params.id;
    return {
      signIn: [],
      urinalysis: [],
      talk: [],
      visit: [],
      leave: [],
      assess: [],
      helping: [],
      agreement: [],
      find: [],
      drugs: [],
      name: "",
      realname: "",
      actions: [
        {
          text: "签到",
          to: { name: "contact-sign-in", params: { id: id } }
        },
        {
          text: "尿检",
          to: { name: "contact-urinalysis", params: { id: id } }
        },
        {
          text: "谈话",
          to: { name: "contact-talk", params: { id: id } }
        },
        {
          text: "拜访",
          to: { name: "contact-visit", params: { id: id } }
        },
        {
          text: "请假",
          to: { name: "contact-leave", params: { id: id } }
        },
        {
          text: "评估",

          to: { name: "contact-assess", params: { id: id } }
        },
        {
          text: "帮扶救助",
          to: { name: "contact-helping", params: { id: id } }
        },
        {
          text: "告诫信息",
          to: { name: "contact-agreement", params: { id: id } }
        },
        {
          text: "查找脱失",
          to: { name: "contact-find", params: { id: id } }
        },
        {
          text: "药物维持",
          to: { name: "contact-drugs", params: { id: id } }
        }
      ]
    };
  },
  components: {
    NoData
  },
  computed: {
    show() {
      return (
        this.signIn.length ||
        this.urinalysis.length ||
        this.talk.length ||
        this.visit.length ||
        this.leave.length ||
        this.assess.length ||
        this.helping.length ||
        this.agreement.length ||
        this.find.length ||
        this.drugs.length
      );
    },
    route() {
      const type = this.$route.params.header;
      const route = this.actions.find(d => `${d.text}记录` === type);
      return route;
    }
  },
  async created() {
    const show = this.$route.params.header;
    const id = this.$route.params.id;
    const archive = await archivesDetail(id);
    if (archive.ret === "200") {
      this.name = archive.data.name;
    }
    const worker = await mineDetail();
    if (worker.ret === "200") {
      this.realname = worker.data.realname;
    }
    switch (show) {
      case "签到记录":
        {
          const data = await personSignRecord(id);
          if (data.ret === "200") {
            data.data.list.forEach(d => {
              d.signTime = format(d.signTime);
            });
            this.signIn = data.data.list;
          }
        }
        break;
      case "尿检记录":
        {
          const data = await urineRecord(id);
          if (data.ret === "200") {
            data.data.list.forEach(d => {
              d.checkTime = format(d.checkTime);
            });
            this.urinalysis = data.data.list;
          }
        }
        break;
      case "谈话记录":
        {
          const data = await personTalkRecord(id);
          if (data.ret === "200") {
            data.data.list.forEach(d => {
              d.talkTime = format(d.talkTime);
            });
            this.talk = data.data.list;
          }
        }
        break;
      case "拜访记录":
        {
          const data = await personVisitRecord(id);
          if (data.ret === "200") {
            data.data.list.forEach(d => {
              d.visitTime = format(d.visitTime);
            });
            this.visit = data.data.list;
          }
        }
        break;
      case "请假记录":
        {
          const data = await personLeaveRecord(id);
          if (data.ret === "200") {
            data.data.list.forEach(d => {
              d.startTime = format(d.startTime);
              d.endTime = format(d.endTime);
            });
            this.leave = data.data.list;
          }
        }
        break;
      case "评估记录":
        {
          const data = await personAssessRecord(id);
          if (data.ret === "200") {
            data.data.forEach(d => {
              d.assessTime = format(d.assessTime);
            });
            this.assess = data.data;
          }
        }
        break;
      case "帮扶救助记录":
        {
          const data = await personHelpRecord(id);
          if (data.ret === "200") {
            data.data.list.forEach(d => {
              d.helpTime = format(d.helpTime);
            });
            this.helping = data.data.list;
          }
        }
        break;
      case "告诫信息记录":
        {
          const data = await personViolationRecord(id);
          if (data.ret === "200") {
            data.data.list.forEach(d => {
              d.violationTime = format(d.violationTime);
            });
            this.agreement = data.data.list;
          }
        }
        break;
      case "查找脱失记录":
        {
          const data = await personFindRecord(id);
          if (data.ret === "200") {
            data.data.list.forEach(d => {
              d.findTime = format(d.findTime);
            });
            this.find = data.data.list;
          }
        }
        break;
      case "药物维持记录":
        {
          const data = await personMedicationRecord(id);
          if (data.ret === "200") {
            data.data.forEach(d => {
              d.medicineTime = format(d.medicineTime);
            });
            this.drugs = data.data;
          }
        }
        break;
      default:
        break;
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.van-cell-group
  border-bottom 10px solid #f2f2f2

.van-icon
  margin-right 5px

.van-step__header
  display flex
  justify-content space-between
  align-items flex-start
  color #152952
  margin-bottom 5px

.van-step__article
  display flex
  justify-content flex-start
  align-items flex-start
  color #152952
</style>
