<template>
  <section class="record">
    <van-steps direction="vertical" :active="0" active-icon="checked">
      <!-- 签到记录 -->
      <template v-if="$route.params.header === '签到记录'">
        <van-step v-for="(item, i) in signIn" :key="i">
          <header class="van-step__header">
            <!-- eslint-disable-next-line -->
            <p class="header__p">{{ item.name }}签到（社工{{ item.worker }}代签)</p>
            <p class="header__p">{{ item.time }}</p>
          </header>
          <article class="van-step__article">
            <van-icon name="map-marked" size="20" class="van-icon" />
            <p>{{ item.area }}</p>
          </article>
        </van-step>
      </template>
      <!-- 尿检记录 -->
      <template v-if="$route.params.header === '尿检记录'">
        <van-step v-for="(item, i) in urinalysis" :key="i">
          <header class="van-step__header">
            <!-- eslint-disable-next-line -->
            <p class="header__p">{{ item.status }}（社工{{ item.worker }}代签)</p>
            <p class="header__p">{{ item.time }}</p>
          </header>
          <article class="van-step__article">
            <van-icon name="map-marked" size="20" class="van-icon" />
            <p>尿检地点：{{ item.area }}</p>
          </article>
        </van-step>
      </template>
      <!-- 谈话记录 -->
      <template v-if="$route.params.header === '谈话记录'">
        <van-step v-for="(item, i) in talk" :key="i">
          <header class="van-step__header">
            <!-- eslint-disable-next-line -->
            <p class="header__p">谈话渠道{{ item.ditch }}（社工{{ item.worker }}代签)</p>
            <p class="header__p">{{ item.time }}</p>
          </header>
          <article class="van-step__article">
            <p>{{ item.content }}</p>
          </article>
        </van-step>
      </template>
      <!-- 拜访记录 -->
      <template v-if="$route.params.header === '拜访记录'">
        <van-step v-for="(item, i) in talk" :key="i">
          <header class="van-step__header">
            <p class="header__p">同行人员:{{ item.field }}</p>
            <p class="header__p">{{ item.time }}</p>
          </header>
          <article class="van-step__article">
            <p>{{ item.content }}</p>
          </article>
        </van-step>
      </template>
      <!-- 请假记录 -->
      <template v-if="$route.params.header === '请假记录'">
        <van-step v-for="(item, i) in leave" :key="i">
          <header class="van-step__header">
            <p class="header__p">{{ item.content }}</p>
            <p class="header__p">{{ item.status }}</p>
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
            <p class="header__p">评估小组成员：{{ item.team }}</p>
            <p class="header__p">{{ item.time }}</p>
          </header>
          <article class="van-step__article">
            <p>{{ item.content }}</p>
          </article>
        </van-step>
      </template>
      <!-- 帮扶救助记录 -->
      <template v-if="$route.params.header === '帮扶救助记录'">
        <van-step v-for="(item, i) in helping" :key="i">
          <header class="van-step__header">
            <p class="header__p">社工姓名：{{ item.worker }}</p>
            <p class="header__p">{{ item.time }}</p>
          </header>
          <article class="van-step__article">
            <p>{{ item.content }}</p>
          </article>
        </van-step>
      </template>
      <!-- 违反协议记录 -->
      <template v-if="$route.params.header === '违反协议记录'">
        <van-step v-for="(item, i) in agreement" :key="i">
          <header class="van-step__header">
            <!-- eslint-disable-next-line -->
            <p class="header__p">社工姓名：{{ item.worker }}</p>
            <p class="header__p">{{ item.time }}</p>
          </header>
          <article class="van-step__article">
            <p>{{ item.content }}</p>
          </article>
        </van-step>
      </template>
      <!-- 查找脱失记录 -->
      <template v-if="$route.params.header === '查找脱失记录'">
        <van-step v-for="(item, i) in find" :key="i">
          <header class="van-step__header">
            <p class="header__p">同行人员:{{ item.field }}</p>
            <p class="header__p">{{ item.time }}</p>
          </header>
          <article class="van-step__article">
            <p>{{ item.content }}</p>
          </article>
        </van-step>
      </template>
      <!-- 药物维持记录 -->
      <template v-if="$route.params.header === '药物维持记录'">
        <van-step v-for="(item, i) in urinalysis" :key="i">
          <header class="van-step__header">
            <p class="header__p">{{ item.drug }}（{{ item.total }}mg)</p>
            <p class="header__p">{{ item.medical }}</p>
            <p class="header__p">{{ item.time }}</p>
          </header>
          <article class="van-step__article">
            <van-icon name="map-marked" size="20" class="van-icon" />
            <p>治疗地点：{{ item.area }}</p>
          </article>
        </van-step>
      </template>
    </van-steps>
  </section>
</template>

<script>
export default {
  name: "contact-record",
  props: {},
  data() {
    return {
      signIn: [
        {
          name: "张怀志",
          worker: "彭晓薇",
          time: "2019-02-08",
          area: "广西壮族自治区桂林市临桂区金水路3号"
        },
        {
          name: "张怀志",
          worker: "彭晓薇",
          time: "2019-01-08",
          area: "广西壮族自治区桂林市临桂区金水路3号"
        }
      ],
      urinalysis: [
        {
          status: "阴性",
          worker: "彭晓薇",
          time: "2019-02-08",
          area: "广西壮族自治区桂林市临桂区派出所"
        },
        {
          status: "阴性",
          worker: "彭晓薇",
          time: "2019-01-08",
          area: "广西壮族自治区桂林市临桂区派出所"
        }
      ],
      talk: [
        {
          ditch: "微信",
          worker: "彭晓薇",
          time: "2019-02-08",
          content: "个人情况良好，正常生活和工作，无不良影响。"
        },
        {
          ditch: "微信",
          worker: "彭晓薇",
          time: "2019-01-08",
          content: "个人情况良好，正常生活和工作，无不良影响。"
        }
      ],
      visit: [
        {
          field: "彭晓薇，李川，王霞",
          time: "2019-02-08",
          content: "目前可以正常与家人和同事沟通，工作正常。"
        },
        {
          field: "彭晓薇，李川，王霞",
          time: "2019-01-08",
          content: "目前可以正常与家人和同事沟通，工作正常。"
        }
      ],
      leave: [
        {
          status: "审批通过",
          startTime: "2019-02-08",
          endTime: "2019-02-09",
          content: "去灵川碧桂园建筑工地做工。"
        },
        {
          status: "审批通过",
          startTime: "2019-01-08",
          endTime: "2019-01-09",
          content: "去灵川碧桂园建筑工地做工。"
        }
      ],
      assess: [
        {
          team: "彭晓薇，李川，王霞",
          time: "2019-02-08",
          content: "本季度情绪稳定，可以正常外出务工。"
        },
        {
          team: "彭晓薇，李川，王霞",
          time: "2019-01-08",
          content: "本季度情绪稳定，可以正常外出务工。"
        }
      ],
      helping: [
        {
          worker: "彭晓薇",
          time: "2019-02-08",
          content: "帮助安排再次就业。"
        },
        {
          worker: "彭晓薇",
          time: "2019-01-08",
          content: "帮助安排再次就业。"
        }
      ],
      agreement: [
        {
          worker: "彭晓薇",
          time: "2019-02-08",
          content: "严重违反社区戒毒(康复)协议第4条"
        },
        {
          worker: "彭晓薇",
          time: "2019-01-08",
          content: "严重违反社区戒毒(康复)协议第4条"
        }
      ],
      find: [
        {
          team: "彭晓薇，李川，王霞",
          time: "2019-02-08",
          content: "通过电话和微信联系，无人接听及回复信息。"
        },
        {
          team: "彭晓薇，李川，王霞",
          time: "2019-01-08",
          content: "到家庭住址实地问询。"
        }
      ],
      drugs: [
        {
          area: "桂林市临桂区戒毒康复中心",
          drug: "美沙酮",
          total: 20,
          medical: "李熙",
          time: "2019-02-08"
        },
        {
          area: "桂林市临桂区戒毒康复中心",
          drug: "美沙酮",
          total: 20,
          medical: "李熙",
          time: "2019-01-08"
        }
      ]
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.van-icon
  margin-right 5px

.van-step__header
  display flex
  justify-content space-between
  align-items center
  color #152952
  margin-bottom 5px

.van-step__article
  display flex
  justify-content flex-start
  align-items center
  color #152952
</style>
