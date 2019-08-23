<template>
  <section class="join">
    <!-- 吸毒人员 -->
    <van-cell-group class="van-cell-group">
      <van-cell title="姓名" value="张怀志">
        <template #right-icon>
          <van-tag class="van-tag" type="danger">高风险</van-tag>
        </template>
        <!-- <van-tag v-if="item.status === 30" type="danger">高风险</van-tag>
        <van-tag v-else-if="item.status === 20" color="rgb(255, 153, 0)">中风险</van-tag>
        <van-tag v-else type="success">低风险</van-tag>-->
      </van-cell>
      <!-- eslint-disable-next-line -->
      <van-cell v-for="(d,i) in addict" :key="i" :title="d.title" :value="d.value" />
    </van-cell-group>
    <!-- 经办人 -->
    <van-cell-group class="van-cell-group">
      <!-- eslint-disable-next-line -->
      <van-cell v-for="(d,i) in handle" :key="i" :title="d.title" :value="d.value" />
      <van-cell title="是否见到本人">
        <van-switch
          v-model="checked"
          class="van-switch"
          disabled
          active-color="#07c160"
          inactive-color="#f44"
        />
      </van-cell>
      <van-cell title="描述内容" label="精神状态良好，xxxxxxxxxxxxx" />
    </van-cell-group>
    <!-- 社工 -->
    <van-cell-group class="van-cell-group">
      <!-- eslint-disable-next-line -->
      <van-cell v-for="(d,i) in worker" :key="i" :title="d.title" :value="d.value" />
    </van-cell-group>
    <!-- 衔接操作 -->
    <footer class="join__footer">
      <van-button type="danger" @click="danger">拒绝衔接</van-button>
      <van-button type="primary" @click="primary">确认衔接</van-button>
      <!-- eslint-disable-next-line -->
      <van-dialog
        class="van-dialog"
        v-model="dialogShow"
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
          v-model="value"
          placeholder="请输入拒绝原因,字数少于200"
          error-message="提示：输入字数应少于200"
        />
      </van-dialog>
    </footer>
  </section>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      checked: true,
      dialogShow: false,
      overlayShow: false,
      value: "",
      addict: [
        {
          title: "身份证号",
          value: "455053198801091100"
        },
        {
          title: "联系方式",
          value: "13211098991"
        },
        {
          title: "户籍地址",
          value: "广西壮族自治区桂林市临桂区金水路3号"
        },
        {
          title: "居住地址",
          value: "广西壮族自治区桂林市临桂区金水路3号"
        },
        {
          title: "当前状态",
          value: "强制隔离戒毒"
        },
        {
          title: "强戒开始日期",
          value: "2019-7-1 10:00"
        },
        {
          title: "强戒结束日期",
          value: "2019-10-1 11:00"
        }
      ],
      handle: [
        {
          title: "经办人",
          value: "张向阳"
        },
        {
          title: "经办单位",
          value: "桂林市强戒所"
        },
        {
          title: "联系方式",
          value: "18907711179"
        }
      ],
      worker: [
        {
          title: "社工姓名",
          value: "彭巧巧"
        },
        {
          title: "单位名称",
          value: "临桂区社区戒毒康复吸毒人员管理中心"
        },
        {
          title: "联系方式",
          value: "13612390981"
        }
      ]
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    danger() {
      this.dialogShow = true;
    },
    primary() {
      const loading = this.$toast.loading({
        mask: true,
        message: "衔接中"
      });
      setTimeout(() => {
        loading.clear();
        this.$toast.success({ message: "衔接成功", duration: 500 });
        // this.$toast.fail({ message: "衔接失败,请重新衔接", duration: 500 });
      }, 2000);
    },
    confirm() {
      const loading = this.$toast.loading({
        mask: true,
        message: "拒绝衔接中"
      });
      setTimeout(() => {
        loading.clear();
        this.$toast.success({ message: "拒绝成功", duration: 500 });
      }, 2000);
    },
    cancel() {
      this.$toast.fail({ message: "已取消拒绝", duration: 500 });
    }
  }
};
</script>

<style lang="stylus" scoped>
.van-cell-group
  border-bottom 10px solid #f2f2f2

.van-tag
  height 20px
  margin 2px 0 0 10px

.van-switch
  font-size 22px !important

.van-dialog
  top 58%

.join__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center
</style>
