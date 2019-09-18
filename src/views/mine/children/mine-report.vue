<template>
  <section class="report">
    <div v-show="show === 'main'">
      <van-cell-group>
        <van-cell title="被举报人" :value="name" is-link @click="cutShow" />
        <!-- eslint-disable-next-line -->
        <van-field
          v-model="content"
          required
          label="举报内容"
          type="textarea"
          placeholder="请输入举报内容"
          rows="3"
          maxlength
          error-message="提示：举报内容输入字数不多于200字"
        />
        <van-field label="相关图片">
          <template #input>
            <van-uploader
              v-model="file"
              :max-count="2"
              class="van-uploader"
              :before-read="beforeRead"
            />
            <!-- eslint-disable-next-line -->
            <div class="van-field__error-message">提示：上传PNG或JPG图片，不多于2张</div>
          </template>
        </van-field>
      </van-cell-group>
      <footer class="report__footer">
        <!-- eslint-disable-next-line -->
        <van-button type="info" size="large" @click="submit">确认举报</van-button>
      </footer>
    </div>
    <div v-show="show === 'list'">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="search"
        shape="round"
        background="#fff"
        @search="setSearch"
      />
      <!-- eslint-disable-next-line -->
      <article class="report__list" ref="report">
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
                :src="require('../../../assets/img/people-head.png')"
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
      <footer class="report__footer">
        <!-- eslint-disable-next-line -->
        <van-button type="info" class="van-button" size="large" @click="choose">确认选择</van-button>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  name: "mine-report",
  props: {},
  data() {
    return {
      show: "main",
      name: "",
      file: [],
      content: "",
      search: "",
      loading: false,
      finished: true,
      result: [],
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
  created() {},
  mounted() {
    this.$nextTick(() => {
      const BScroll = this.$BScroll;
      this.bs = new BScroll(this.$refs.report, {
        scrollY: true,
        probeType: 3,
        click: true,
        pullUpLoad: true
      });
      this.bs.on("pullingUp", this.pullingUpHandler);
      this.loading = this.list.length < this.total ? true : false;
      this.finished = this.list.length < this.total ? false : true;
    });
  },
  updated() {
    this.$nextTick(() => {
      this.bs.finishPullUp();
      this.bs.refresh();
    });
  },
  methods: {
    submit() {
      const loading = this.$toast.loading({
        mask: true,
        message: "提交修改中"
      });
      setTimeout(() => {
        loading.clear();
        this.$toast.success({
          message: "修改成功",
          duration: 500,
          onClose: () => {
            this.$router.go(-1);
          }
        });
      }, 2000);
    },
    focus(event) {},
    beforeRead(file) {
      const i = file.type.indexOf("image");
      if (i !== 0) {
        this.$toast.fail("请上传\n图片类型文件");
      }
      return i === 0;
    },
    cutShow() {
      this.show = this.show === "main" ? "list" : "main";
    },
    choose() {
      this.show = this.show === "main" ? "list" : "main";
      this.result.forEach((d, i) => {
        this.name +=
          i === this.result.length - 1
            ? this.list[d].name
            : `${this.list[d].name}、`;
      });
    },
    setSearch() {},
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
.van-field__error-message
  color #f44
  font-size 3.2vw
  text-align left

.report
  height calc( 100vh - 46px + 46px )
  position relative
  top 0
  left 0

.report__footer
  display block
  position absolute
  bottom 0
  left 0
  right 0
  margin auto
  padding 5px 20px

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

.report__list
  height calc( 100vh - 46px + 46px - 54px - 50px )
  overflow hidden
  border-bottom 10px solid #f2f2f2

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

@media ( max-height: 250px )
  .report__footer
    display none
</style>
