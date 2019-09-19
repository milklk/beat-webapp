<template>
  <section>
    <!-- eslint-disable-next-line -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已展示最近10条"
      :immediate-check="false"
    >
      <router-link
        v-for="(item, i) in approval"
        :key="i"
        :to="{
          name: 'home-approve',
          params: { status: 'approval', id: item.id }
        }"
        class="list__item"
        :class="{
          success: item.status === 1,
          danger: item.status === 2
        }"
      >
        <van-image
          class="item__img"
          round
          fit="cover"
          :src="require('../../../../assets/img/people-head.png')"
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
  </section>
</template>

<script>
import { approvesRecord } from "../../../../api";
import { format } from "../../../../utils/date";
export default {
  name: "home-record",
  props: {},
  data() {
    return {
      loading: false,
      finished: true,
      approval: []
    };
  },
  components: {},
  computed: {},
  async created() {
    const id = this.$route.params.id;
    const list = await approvesRecord(id);
    if (list.ret === "200") {
      list.data.list.forEach(d => {
        d.startTime = format(d.startTime);
        d.endTime = format(d.endTime);
        d.time = format(d.leaveTime);
      });
      this.approval = list.data.list;
    }
  },
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
