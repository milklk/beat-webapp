<template>
  <section>
    <!-- eslint-disable-next-line -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false">
      <router-link
        v-for="(item, i) in approval"
        :key="i"
        :to="{
          name: 'home-approve',
          params: { status: 'approval', id: 1 }
        }"
        class="list__item"
        :class="item.cased ? item.cased : ''"
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
              <span class="h_area">（{{ item.area }}）</span>
            </h3>
            <!-- eslint-disable-next-line -->
            <van-tag class="van-tag" v-if="item.risk === 30" type="danger">高风险</van-tag>
            <!-- eslint-disable-next-line -->
            <van-tag class="van-tag" v-else-if="item.risk === 20" color="rgb(255, 153, 0)">中风险</van-tag>
            <!-- eslint-disable-next-line -->
            <van-tag class="van-tag" v-else type="success">低风险</van-tag>
          </header>
          <p class="content__p">请假类型：{{ item.type }}</p>
          <p class="content__p">开始时间：{{ item.startTime }}</p>
          <p class="content__p">结束时间：{{ item.endTime }}</p>

          <p class="content__p content__p--status">
            <!-- eslint-disable-next-line -->
            {{ !item.status ? "待审批" : item.cased === 'cancel' ? '已撤销' : item.cased === 'success' ? '审批通过' : '审批拒绝' }}
          </p>
        </article>
        <aside class="item__time">{{ item.time }}</aside>
      </router-link>
    </van-list>
  </section>
</template>

<script>
export default {
  name: "home-record",
  props: {},
  data() {
    return {
      loading: false,
      finished: true,
      approval: [
        {
          name: "张怀志",
          area: "临桂区",
          type: "病假",
          startTime: "2019-10-01 11:00",
          endTime: "2019-10-02 11:00",
          time: "2019-10-01",
          risk: 20,
          status: true,
          cased: "cancel"
        },
        {
          name: "张怀志",
          area: "临桂区",
          type: "病假",
          startTime: "2019-10-01 11:00",
          endTime: "2019-10-02 11:00",
          time: "2019-10-01",
          risk: 20,
          status: true,
          cased: "success"
        },
        {
          name: "张怀志",
          area: "临桂区",
          type: "病假",
          startTime: "2019-10-01 11:00",
          endTime: "2019-10-02 11:00",
          time: "2019-10-01",
          risk: 20,
          status: true,
          cased: "danger"
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
.van-tag
  padding 0 0.7em

.cancel
  background url( '../../../../assets/img/cancel.png' ) right 60% / 32.67vw 26.67vw no-repeat

.success
  background url( '../../../../assets/img/success.png' ) right 60% / 32.67vw 26.67vw no-repeat

.danger
  background url( '../../../../assets/img/danger.png' ) right 60% / 32.67vw 26.67vw no-repeat

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
