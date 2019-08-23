<template>
  <section class="approve">
    <!-- 吸毒人员 -->
    <header class="approve__header">
      <h3 class="header__h">
        <article>
          <strong class="h__name">{{ addict.name }}</strong>
          <span class="h__area">（{{ addict.area }}）</span>
        </article>
        <!-- eslint-disable-next-line -->
        <van-tag class="van-tag" v-if="addict.risk === 30" type="danger">高风险</van-tag>
        <!-- eslint-disable-next-line -->
        <van-tag class="van-tag" v-else-if="addict.risk === 20" color="rgb(255, 153, 0)">中风险</van-tag>
        <!-- eslint-disable-next-line -->
        <van-tag class="van-tag" v-else type="success">低风险</van-tag>
      </h3>
      <p class="header__p">
        <!-- eslint-disable-next-line -->
        {{addict.phone}} {{ addict.type }} {{ addict.startTime }} 至 {{ addict.endTime }}
      </p>
      <p class="header__p">{{ addict.site }}</p>
    </header>
    <!-- 请假记录 -->
    <!-- eslint-disable-next-line -->
    <van-cell-group v-if="$route.params.status === 'dandelion'" class="van-cell-group">
      <!-- eslint-disable-next-line -->
      <van-cell title="请假记录" is-link :to="{ name: 'home-record',  params: { id : 1} }" />
    </van-cell-group>
    <!-- 请假信息 -->
    <van-cell-group class="van-cell-group">
      <!-- eslint-disable-next-line -->
      <van-cell v-for="(d,i) in off" :key="i" :title="d.title" :value="d.value" />
      <!-- eslint-disable-next-line -->
      <van-cell value="以上请假情况属实，本人自愿遵守请假外出的相关规定，并按期返回销假。" />
    </van-cell-group>
    <!-- 社工 -->
    <van-cell-group class="van-cell-group">
      <!-- eslint-disable-next-line -->
      <van-cell v-for="(d,i) in worker" :key="i" :title="d.title" :value="d.value" />
    </van-cell-group>
    <!-- 社工审批流程 -->
    <van-steps
      v-if="$route.params.status === 'dandelion'"
      class="van-steps"
      direction="vertical"
      :active="1"
    >
      <van-step class="van-step">
        <!-- eslint-disable-next-line -->
        <van-cell class="van-cell" title="张怀志 发起申请" value="2019-8-3 10:00" />
      </van-step>
      <van-step class="van-step">
        <van-cell class="van-cell" title value="2019-8-3 12:40">
          <template #title>
            <span>彭晓薇</span>
            <strong class="van-cell__em">已同意</strong>
          </template>
        </van-cell>
      </van-step>
    </van-steps>
    <!-- 审批人 -->
    <!-- eslint-disable-next-line -->
    <van-cell-group class="van-cell-group" v-if="$route.params.status === 'approval'">
      <!-- eslint-disable-next-line -->
      <van-cell v-for="(d,i) in handle" :key="i" :title="d.title" :value="d.value" />
      <van-cell title="审批备注" label="以上请假情况属实，同意请假"></van-cell>
    </van-cell-group>

    <!-- 审批操作 -->
    <footer v-if="$route.params.status === 'dandelion'" class="approve__footer">
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="default" @click="repeal">撤销</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="danger" @click="danger">拒绝</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="primary" @click="primary">同意</van-button>
      <van-dialog
        class="van-dialog"
        v-model="dialogShow"
        title="审批备注"
        show-cancel-button
        @confirm="confirm"
        @cancel="cancel"
      >
        <van-field
          type="textarea"
          :autosize="{ maxHeight: 150, minHeight: 50 }"
          maxlength="200"
          rows="3"
          v-model="value"
          placeholder="请输入审批备注,字数少于200"
          error-message="提示：输入字数应少于200"
        />
      </van-dialog>
    </footer>
  </section>
</template>

<script>
export default {
  name: "home-approve",
  props: {},
  data() {
    return {
      dialogShow: false,
      value: "",
      addict: {
        name: "张怀志",
        area: "临桂区",
        risk: 20,
        phone: 18211981789,
        type: "社区戒毒",
        startTime: "2017-7-1",
        endTime: "2020-6-1",
        site: "广西壮族自治区桂林市临桂区金水路3号"
      },
      off: [
        {
          title: "请假申请时间",
          value: "2019-8-3"
        },
        {
          title: "请假事由",
          value: "去灵川碧桂园建筑工地做工"
        },
        {
          title: "被访单位",
          value: "灵川碧桂园房地产开发有限公司"
        },
        {
          title: "被访人姓名",
          value: "王大川"
        },
        {
          title: "被访人电话",
          value: "15678976518"
        },
        {
          title: "双方关系",
          value: "劳务"
        },
        {
          title: "请假开始时间",
          value: "2019-8-3"
        },
        {
          title: "请假结束时间",
          value: "2019-9-3"
        },
        {
          title: "活动范围",
          value: "灵川百花南一路"
        }
      ],
      worker: [
        {
          title: "社工姓名",
          value: "彭晓薇"
        },
        {
          title: "联系方式",
          value: "13423678765"
        }
      ],
      handle: [
        {
          title: "审批人",
          value: "彭晓薇"
        },
        {
          title: "审批状态",
          value: "审批通过"
        },
        {
          title: "审批时间",
          value: "2019-8-3"
        }
      ],
      operate: ""
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    // 撤销
    repeal() {
      this.dialogShow = true;
      this.operate = "repeal";
    },
    // 同意
    primary() {
      this.dialogShow = true;
      this.operate = "primary";
    },
    // 拒绝
    danger() {
      this.dialogShow = true;
      this.operate = "danger";
    },
    // 审批备注提交操作
    confirm() {
      const loading = this.$toast.loading({
        mask: true,
        message: "审批提交中"
      });
      setTimeout(() => {
        loading.clear();
        this.$toast.success({
          message: "已审批",
          duration: 500,
          onClose: () => {
            this.$router.push({ path: "/home/approves" });
          }
        });
      }, 2000);
    },
    // 审批备注取消操作
    cancel() {
      this.$toast.fail({ message: "已取消审批操作", duration: 500 });
    }
  }
};
</script>

<style lang="stylus" scoped>
.van-cell-group, .van-steps
  border-bottom 10px solid #f2f2f2

.van-tag
  padding 0 0.7em

.van-button
  width 100px

.van-cell__em
  color #07c160
  margin-left 5px

.van-steps .van-cell
  padding 0

.van-dialog
  top 58%

.approve__header
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

.approve__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center
</style>
