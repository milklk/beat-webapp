<template>
  <section class="send">
    <!-- 吸毒人员 -->
    <article class="send__main">
      <van-cell-group class="van-cell-group">
        <!-- eslint-disable-next-line -->
        <van-cell v-for="(d,i) in off" :key="i" :title="d.title" :value="detail[d.value]" />
      </van-cell-group>
      <van-dialog
        class="van-dialog"
        v-model="show"
        title="拒绝原因"
        show-cancel-button
        @confirm="confirm"
        @cancel="cancel"
      >
        <van-field
          type="textarea"
          :autosize="{ maxHeight: 150, minHeight: 50 }"
          maxlength="200"
          rows="3"
          v-model="remark"
          placeholder="请输入拒绝原因,字数少于200"
          error-message="提示：输入字数应少于200"
        />
      </van-dialog>
    </article>

    <!-- 接收操作 -->
    <footer class="send__footer">
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="danger" @click="danger">拒绝</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="primary" @click="primary">同意</van-button>
    </footer>
  </section>
</template>

<script>
import { workReceptionDetail, workReception } from "../../../../api";

export default {
  name: "home-send",
  props: {},
  data() {
    return {
      off: [
        {
          title: "姓名",
          value: "name"
        },
        {
          title: "联系方式",
          value: "mobile"
        },
        {
          title: "身份证号",
          value: "personId"
        },
        {
          title: "原归属人",
          value: "transferUserName"
        },
        {
          title: "原归属单位",
          value: "transferOrgName"
        }
      ],
      status: 0,
      id: "",
      detail: {},
      remark: "",
      show: false
    };
  },
  components: {},
  computed: {},
  async created() {
    const id = this.$route.params.id;
    const detail = await workReceptionDetail(id);
    if (detail.ret === "200") {
      this.detail = detail.data.list[0];
      this.id = detail.data.list[0].id;
    }
  },
  methods: {
    // 同意
    async primary() {
      this.status = 1;
      const loading = this.$toast.loading({
        mask: true,
        message: "确认接收中"
      });
      const show = await workReception(this.id, this.status);
      if (show.ret === "200") {
        loading.clear();
        this.$toast.success({
          message: "已确认接收",
          duration: 500,
          onClose: () => {
            this.$router.go(-1);
          }
        });
      }
    },
    // 拒绝
    danger() {
      this.show = true;
      this.status = 2;
    },
    // 拒绝提交操作
    async confirm() {
      const loading = this.$toast.loading({
        mask: true,
        message: "拒绝接收中"
      });

      if (!this.remark) {
        this.$toast.fail("未填写拒绝原因");
        return false;
      }
      const show = await workReception(this.id, this.status, this.remark);
      if (show.ret === "200") {
        loading.clear();
        this.$toast.success({
          message: "已拒绝接收",
          duration: 500,
          onClose: () => {
            this.$router.go(-1);
          }
        });
      }

      // setTimeout(() => {

      // }, 2000);
    },
    // 审批备注取消操作
    cancel() {
      this.$toast.fail({ message: "已取消拒绝", duration: 500 });
    }
  }
};
</script>

<style lang="stylus" scoped>
.van-cell-group, .van-steps
  border-bottom 10px solid #fff

.van-tag
  padding 0 0.7em

.van-button
  width 100px

.van-cell__em
  color #07c160
  margin-left 5px

.van-steps .van-cell
  padding 0

.send__main
  min-height calc( 100vh - 55px )

.send__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center
</style>
