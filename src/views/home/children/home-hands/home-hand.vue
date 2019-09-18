<template>
  <section class="hand">
    <van-search
      placeholder="请输入搜索关键词"
      v-model="keyword"
      shape="round"
      background="#fff"
      @search="search"
    />
    <!-- eslint-disable-next-line -->
    <article class="hand__list" ref="hand">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
      >
        <van-radio-group v-model="result">
          <van-cell
            v-for="(item, i) in list"
            :key="i"
            :value="item.mobile"
            class="van-cell--checkbox van-cell--auto"
          >
            <template #title>
              <van-radio :name="item.userId">
                <!-- eslint-disable-next-line -->
                <div class="van-checkbox__label">{{ item.realname }}</div>
              </van-radio>
            </template>
          </van-cell>
        </van-radio-group>
      </van-list>
    </article>
    <footer class="hand__footer">
      <!-- eslint-disable-next-line -->
      <van-button @click="transfer" class="van-button" type="info">
        <!-- eslint-disable-next-line -->
        确认移交
      </van-button>
    </footer>
  </section>
</template>

<script>
import { archivesUsers, archivesTransfer } from "../../../../api";
export default {
  name: "",
  props: {},
  data() {
    return {
      loading: true,
      finished: false,
      page: 1,
      keyword: "",
      result: [],
      checked: [],
      list: [],
      total: 0,
      bs: {}
    };
  },
  components: {},
  computed: {},
  async created() {
    const params = this.$route.params;
    if (!params.id) {
      this.$router.go(-1);
    } else {
      await this.updateList();
      if (this.total <= 15) {
        this.loading = false;
        this.finished = true;
      }
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
    });
  },
  updated() {
    this.$nextTick(() => {
      this.bs.finishPullUp();
      this.bs.refresh();
    });
  },
  methods: {
    async search() {
      this.page = 1;
      const hand = await archivesUsers(this.page++, 15, this.keyword);
      if (hand.ret === "200") {
        this.list = hand.data.list;
        this.total = hand.data.total;
        if (this.total <= 15) {
          this.loading = false;
          this.finished = true;
        }
      }
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
      const hand = await archivesUsers(this.page++, 15, this.keyword);
      if (hand.ret === "200") {
        this.list = this.list.concat(hand.data.list);
        this.total = hand.data.total;
      }
    },
    async transfer() {
      const archivesCodes = this.$route.params.id;
      const userId = this.result;
      const show = await archivesTransfer(archivesCodes, userId);
      if (show.ret === "200") {
        this.$toast.success({
          message: "移交成功",
          duration: 500,
          onClose: () => {
            this.$router.go(-1);
          }
        });
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
  height calc( 100vh - 46px + 46px - 54px - 50px )
  overflow hidden
  border-bottom 10px solid #f2f2f2

.hand__footer
  height 50px
  padding 3px
  background #fff
</style>
