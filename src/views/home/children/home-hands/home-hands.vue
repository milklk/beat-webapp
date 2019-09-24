<template>
  <!-- eslint-disable -->
  <section class="hands">
    <div v-show="$route.path === '/home/hands'">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="keyword"
        shape="round"
        background="#fff"
        @search="search"
      />
      <!-- eslint-disable-next-line -->
      <article class="hands__list" ref="hands">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="list.length ? '没有更多了': '暂无人员'"
          :immediate-check="false"
        >
          <van-checkbox-group v-model="result">
            <!-- eslint-disable-next-line -->
            <van-checkbox v-for="(item,i) in list" :key="i" :name="item.code" class="list__item">
              <!-- eslint-disable-next-line -->
              <van-image class="item__avatar" :src="setPhoto(item.headPhoto)" />
              <ul class="item__content">
                <li class="content__li">
                  <p class="li__p">
                    <strong class="p__strong">{{ item.name }}</strong>
                    <span class="p__span">（{{item.sex}}）</span>
                  </p>
                  <p class="li__p">{{ item.mobile }}</p>
                </li>
                <li class="content__li">
                  <p class="li__p">{{ item.idCard }}</p>
                  <p class="li__p">
                    <van-tag
                      class="van-tag"
                      :type=" item.status == 0 ? 'warning' : item.status == 2 ? 'danger' : 'primary'"
                    >
                      <!-- eslint-disable-next-line -->
                      {{ item.distributeName }}
                    </van-tag>
                    <van-tag class="van-tag" type="danger" v-if="item.status">
                      <!-- eslint-disable-next-line -->
                      {{ item.userStatusName }}
                    </van-tag>
                  </p>
                </li>
              </ul>
            </van-checkbox>
          </van-checkbox-group>
        </van-list>
      </article>
      <footer class="hands__footer">
        <!-- eslint-disable-next-line -->
        <van-button class="van-button" type="info" @click="submit">
          <!-- eslint-disable-next-line -->
          申请移交
        </van-button>
      </footer>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import { archives, headPhoto } from "../../../../api";
import photo from "../../../../assets/img/people-head.png";

export default {
  name: "home-hands",
  props: {},
  data() {
    return {
      loading: true,
      finished: false,
      page: 1,
      keyword: "",
      result: [],
      list: [],
      total: 0,
      bs: {}
    };
  },
  components: {},
  computed: {},
  watch: {
    $route() {
      this.result = [];
      this.search();
    }
  },
  mounted() {
    this.$nextTick(async () => {
      await this.updateList();
      if (this.total <= 15) {
        this.loading = false;
        this.finished = true;
      }
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.hands, {
        scrollY: true,
        probeType: 3,
        click: true,
        pullUpLoad: true
      });
      this.bs.on("pullingUp", this.pullingUpHandler);
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
      if (this.result.length) {
        this.$router.push({ name: "home-hand", params: { id: this.result } });
      } else {
        this.$toast.fail("未选择移交人员");
      }
    },
    async search() {
      this.page = 1;
      const hands = await archives(this.page++, 15, this.keyword);
      if (hands.ret === "200") {
        hands.data.list.forEach(d => {
          const show = d.status;
          d.distributeName =
            show == 0 ? "移交中" : show == 2 ? "已拒收" : "正常";
        });
        this.list = hands.data.list;
        this.total = hands.data.total;
        if (this.total <= 15) {
          this.loading = false;
          this.finished = true;
        } else {
          this.loading = true;
          this.finished = false;
        }
      }
    },
    setPhoto(attId) {
      const headerImg = attId ? headPhoto(attId) : photo;
      return headerImg;
    },
    async pullingUpHandler() {
      if (this.list.length >= this.total) {
        this.finished = true;
        this.loading = false;
      } else {
        this.updateList();
      }
    },
    async updateList() {
      const hands = await archives(this.page++, 15, this.keyword);
      if (hands.ret === "200") {
        hands.data.list.forEach(d => {
          const show = d.status;
          d.distributeName =
            show == 0 ? "移交中" : show == 2 ? "已拒收" : "正常";
        });
        this.list = this.list.concat(hands.data.list);
        this.total = hands.data.total;
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
  height calc( 100vh - 46px + 46px - 54px - 55px )
  overflow hidden
  border-bottom 10px solid #f2f2f2

.list__item
  display flex
  justify-content space-around
  align-items center
  padding 8px 0

  .item__avatar
    width 40px
    height 40px

  .item__content
    display inline-flex
    width 260px
    height 50px
    justify-content space-between
    padding-left 10px

    .content__li
      display flex
      flex-direction column
      justify-content space-between

      .li__p
        height 22px
        color #1989fa
        display flex
        align-items center
        white-space nowrap

        .p__strong
          font-size 15px
          line-height 22px
          font-weight 400
          color #152962
          max-width 75px
          overflow hidden
          text-overflow ellipsis

        .p__span
          line-height 22px
          color #737392

.hands__footer
  height 50px
  padding 5px
  background #fff
</style>
