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
      <!-- eslint-disable-next-line -->
      <article class="hands__list" :class="{'hands__list--ios': $userAgent === 'ios'}" ref="hands">
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
      <footer class="hands__footer">
        <!-- eslint-disable-next-line -->
        <van-button :to="{name: 'home-hand',params: {id: result} }" class="van-button" type="info">
          <!-- eslint-disable-next-line -->
          申请移交
        </van-button>
      </footer>
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
      loading: true,
      finished: false,
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
      ],
      total: 20,
      bs: {}
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.hands, {
        scrollY: true,
        probeType: 3,
        pullUpLoad: true
      });
      this.bs.on("pullingUp", this.pullingUpHandler);
      this.loading = this.bs.hasVerticalScroll ? true : false;
      this.finished = this.bs.hasVerticalScroll ? false : true;
    });
  },
  updated() {
    if (this.$route.path === "/home/hands") {
      this.$nextTick(() => {
        this.bs.finishPullUp();
        this.bs.refresh();
      });
    }
  },
  methods: {
    submit() {
      this.list = this.list.slice(0, 5);
      this.$nextTick(() => {
        this.bs.refresh();
        this.loading = this.bs.hasVerticalScroll ? true : false;
        this.finished = this.bs.hasVerticalScroll ? false : true;
      });
    },
    async pullingUpHandler() {
      if (this.list.length >= this.total) {
        this.finished = true;
        this.loading = false;
      } else {
        const list = this.list.slice(0, 5);
        await setTimeout(() => {
          this.list = this.list.concat(list);
        }, 2000);
      }
    }
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
  height 40px
  line-height 40px

.hands__list
  height calc( 100vh - 46px - 54px - 50px )
  overflow hidden
  border-bottom 10px solid #f2f2f2

  &.hands__list--ios
    height calc( 100vh - 46px - 54px - 50px - 75px )

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

.hands__footer
  height 50px
  padding 5px
  background #fff
</style>
