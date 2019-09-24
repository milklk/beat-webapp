<template>
  <section class="contacts">
    <div v-show="$route.path === '/home/sends'">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="keyword"
        shape="round"
        background="#fff"
        @search="search"
      />
      <article class="contacts__list" ref="contacts">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="list.length ? '没有更多了' : '暂无接收人员'"
          :immediate-check="false"
        >
          <!-- eslint-disable-next-line -->
          <div v-for="(item, i) in list" :key="i" class="list__item" @click="link(item.id)">
            <!-- eslint-disable-next-line -->
            <van-image class="item__avatar" :src="setPhoto(item.headPhoto)" />
            <ul class="item__content">
              <li class="content__li">
                <p class="li__p">
                  <strong class="p__strong">{{ item.name }}</strong>
                  <!-- <span class="p__span">（ {{item.sex}} ）</span> -->
                </p>
                <p class="li__p">{{ item.mobile }}</p>
              </li>
              <li class="content__li">
                <p class="li__p">{{ item.personId }}</p>
                <p class="li__p">
                  <!-- eslint-disable-next-line -->
                  <van-tag class="van-tag" type="success">{{ item.sex }}</van-tag>
                  <van-tag class="van-tag" type="danger" v-if="item.status">
                    <!-- eslint-disable-next-line -->
                    {{ item.userStatusName }}
                  </van-tag>
                </p>
              </li>
            </ul>
          </div>
        </van-list>
      </article>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import { workReceptionList, headPhoto } from "../../../../api";
import photo from "../../../../assets/img/people-head.png";
export default {
  name: "contacts",
  props: {},
  data() {
    return {
      loading: true,
      finished: false,
      keyword: "",
      list: [],
      page: 1,
      addict: {},
      total: 0,
      bs: {}
    };
  },
  components: {},
  computed: {},
  async created() {
    await this.updateList();
    if (this.total <= 15) {
      this.loading = false;
      this.finished = true;
    }
  },
  watch: {
    async $route(to) {
      if (to.path === "/home/sends") {
        this.list = [];
        await this.updateList();
        if (this.total <= 15) {
          this.loading = false;
          this.finished = true;
        } else {
          this.loading = true;
          this.finished = false;
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.contacts, {
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
      const contacts = await workReceptionList(this.page++, 15, this.keyword);
      if (contacts.ret === "200") {
        this.list = contacts.data.list;
        this.total = contacts.data.total;
        if (this.total <= 15) {
          this.loading = false;
          this.finished = true;
        } else {
          this.loading = true;
          this.finished = false;
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
    setPhoto(attId) {
      const headerImg = attId ? headPhoto(attId) : photo;
      return headerImg;
    },
    async updateList() {
      const contacts = await workReceptionList(this.page++, 15, this.keyword);
      if (contacts.ret === "200") {
        this.list = this.list.concat(contacts.data.list);
        this.total = contacts.data.total;
      }
    },
    async link(code) {
      this.$router.push({ name: "home-send", params: { id: code } });
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

.contacts__list
  height calc( 100vh - 46px + 46px - 55px )
  overflow hidden

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
    justify-content space-between

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
          white-space nowrap
          max-width 65px
          overflow hidden
          text-overflow ellipsis

        .p__span
          line-height 22px
          color #737392

.contact__header
  border-bottom 10px solid #f2f2f2
  height 100px
  padding 10px 20px
  display flex
  flex-direction column
  justify-content space-between

  .header__h
    display flex
    justify-content space-between
    font-weight normal

    .h__name
      font-size 16px
      font-weight normal
      color #152952

    .h_area
      font-size 12px
      color #737397

  .header__p
    font-size 14px
    color #737397
</style>
