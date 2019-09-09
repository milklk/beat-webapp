<template>
  <section class="hand">
    <van-search
      placeholder="请输入搜索关键词"
      v-model="search"
      shape="round"
      background="#f2f2f2"
      @search="submit"
    />
    <!-- eslint-disable-next-line -->
    <article class="hand__list" ref="hand">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
      >
        <van-checkbox-group v-model="result">
          <van-cell
            v-for="(item, i) in list"
            :key="i"
            :value="item.phone"
            class="van-cell--checkbox"
          >
            <template #title>
              <van-checkbox v-model="checked" :name="i">
                <!-- eslint-disable-next-line -->
                <div class="van-checkbox__label">{{ item.name }}({{ item.area }})</div>
              </van-checkbox>
            </template>
          </van-cell>
        </van-checkbox-group>
      </van-list>
    </article>
    <footer class="hand__footer">
      <!-- eslint-disable-next-line -->
      <van-button :to="{name: 'home-hand',params: {id: result} }" class="van-button" type="info">
        <!-- eslint-disable-next-line -->
        确认移交
      </van-button>
    </footer>
  </section>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      loading: false,
      finished: true,
      result: [],
      search: "",
      checked: [],
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
      ],
      total: 20
    };
  },
  components: {},
  computed: {},
  created() {
    const params = this.$route.params;
    if (!params.id) {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.hand, {
        scrollY: true,
        probeType: 3,
        click: true,
        pullUpLoad: true
      });
      this.bs.on("pullingUp", this.pullingUpHandler);
      this.loading = this.bs.hasVerticalScroll ? true : false;
      this.finished = this.bs.hasVerticalScroll ? false : true;
    });
  },
  updated() {
    this.$nextTick(() => {
      this.bs.finishPullUp();
      this.bs.refresh();
    });
  },
  methods: {
    submit() {},
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
.van-button
  display block
  width 260px
  text-align center
  margin auto

.van-checkbox__label
  color #737392
  line-height 25px

.hand__list
  height calc( 100vh - 46px - 54px - 50px )
  overflow hidden
  border-bottom 10px solid #f2f2f2

.hand__footer
  height 50px
  padding 3px
  background #fff
</style>
