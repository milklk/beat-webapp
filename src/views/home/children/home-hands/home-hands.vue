<template>
  <section class="hands">
    <div v-show="$route.path === '/home/hands'">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="search"
        shape="round"
        background="#f2f2f2"
        @search="submit"
      />
      <article class="hands__list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
        >
          <van-checkbox-group v-model="result">
            <!-- eslint-disable-next-line -->
            <van-checkbox v-for="(item,i) in list" :key="i" :name="i" class="list__item">
              <van-image
                class="item__avatar"
                :src="require('../../../../assets/img/people-head.png')"
              />
              <ul class="item__content">
                <li class="content__li">
                  <p class="li__p">
                    <strong class="p__strong">王晓婷</strong>
                    <span class="p__span">（临桂区）</span>
                  </p>
                  <p class="li__p">18011981787</p>
                </li>
                <li class="content__li">
                  <p class="li__p">45505319******1100</p>
                  <p class="li__p">
                    <!-- eslint-disable-next-line -->
                    <van-tag class="van-tag" v-if="item.risk === 30" type="danger">高风险</van-tag>
                    <!-- eslint-disable-next-line -->
                    <van-tag class="van-tag" v-else-if="item.risk === 20" color="rgb(255, 153, 0)">
                      <!-- eslint-disable-next-line -->
                      中风险
                    </van-tag>
                    <!-- eslint-disable-next-line -->
                    <van-tag class="van-tag" v-else type="success">低风险</van-tag>
                    <!-- eslint-disable-next-line -->
                    <van-tag class="van-tag" v-if="item.status">{{ item.status }}</van-tag>
                  </p>
                </li>
              </ul>
            </van-checkbox>
          </van-checkbox-group>
        </van-list>
      </article>
      <van-button :to="{name: 'home-hand',params: {id: result} }" class="van-button" type="info">申请移交</van-button>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "home-hands",
  props: {},
  data() {
    return {
      loading: false,
      finished: true,
      result: [],
      search: "",
      list: [
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        }
      ]
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    submit() {}
  }
};
</script>

<style lang="stylus" scoped>
.van-tag
  padding 0 0.7em
  margin 0 3px

.van-button
  display block
  width 260px
  text-align center
  margin auto

.list__item
  display flex
  justify-content space-around
  align-items center
  padding 5px 0

  .item__avatar
    width 40px
    height 40px

  .item__content
    display inline-flex
    width 260px
    height 50px
    justify-content space-around

    .content__li
      display flex
      flex-direction column
      justify-content space-between

      .li__p
        height 22px
        color #1989fa
        display flex
        align-items center

        .p__strong
          font-size 15px
          line-height 22px
          font-weight 400
          color #152962

        .p__span
          line-height 22px
          color #737392
</style>
