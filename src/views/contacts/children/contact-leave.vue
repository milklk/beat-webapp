<template>
  <section class="talk">
    <van-cell-group class="van-cell-group van-cell-group--mini">
      <van-cell
        title="请假记录"
        :value="total"
        is-link
        :to="{
          name: 'contact-record',
          params: { header: '请假记录', id: $route.params.id }
        }"
      />
    </van-cell-group>
    <van-divider class="van-divider">代上传请假信息</van-divider>
    <van-cell-group class="van-cell-group van-cell-group--mini">
      <!-- eslint-disable-next-line -->
      <van-cell required title="申请时间" :value="form.time" @click="setTime('time')">
        <template #right-icon>
          <van-icon class="van-icon" name="add-o" />
        </template>
      </van-cell>
      <!-- eslint-disable-next-line -->
      <van-cell required title="开始时间" :value="form.startTime" @click="setTime('startTime')">
        <template #right-icon>
          <van-icon class="van-icon" name="add-o" />
        </template>
      </van-cell>
      <!-- eslint-disable-next-line -->
      <van-cell required title="结束时间" :value="form.endTime" @click="setTime('endTime')">
        <template #right-icon>
          <van-icon class="van-icon" name="add-o" />
        </template>
      </van-cell>
      <!-- eslint-disable-next-line -->
      <van-field v-model="form.content" label="请假事由" placeholder="请输入请假事由" required />
      <!-- eslint-disable-next-line -->
      <van-field v-model="form.units" label="被访单位" placeholder="请输入被访单位" required />
      <!-- eslint-disable-next-line -->
      <van-field v-model="form.name" label="被访人姓名" placeholder="请输入被访人姓名" required />
      <!-- eslint-disable-next-line -->
      <van-field v-model="form.phone" label="被访人电话" placeholder="请输入被访人电话" required />
      <!-- eslint-disable-next-line -->
      <van-field v-model="form.relation" label="双方关系" placeholder="请输入双方关系" required />
      <!-- eslint-disable-next-line -->
      <van-field v-model="form.scope" label="活动范围" placeholder="请输入活动范围" required />

      <!-- eslint-disable-next-line -->
      <van-popup v-model="show" round position="bottom" class="van-popup" get-container="main">
        <van-datetime-picker
          v-model="time"
          type="date"
          @confirm="timeConfirm"
          @cancel="timeCancel"
        />
      </van-popup>
    </van-cell-group>
    <van-divider class="van-divider">社工信息</van-divider>
    <van-cell-group class="van-cell-group">
      <van-cell title="社工姓名" :value="worker.name" />
      <van-cell title="联系电话" :value="worker.phone" />
      <van-radio-group v-model="radio">
        <!-- eslint-disable-next-line -->
        <van-cell title="以上请假信息属实，由本人代为上传请假信息。" @click="radio=radio === false ? true : false">
          <template #icon>
            <van-radio class="van-radio" :name="true" />
          </template>
        </van-cell>
      </van-radio-group>
    </van-cell-group>
    <footer class="urinalysis__footer">
      <van-button class="van-button" @click="cancel">取消</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="primary" @click="confirm">确认</van-button>
    </footer>
  </section>
</template>

<script>
import { format } from "../../../utils/date.js";
export default {
  name: "contact-visit",
  props: {},
  data() {
    return {
      total: 3,
      show: false,
      time: new Date(),
      file: [],
      radio: true,
      timeType: "",
      form: {
        time: `${format(new Date(), "yyyy-MM-dd")}`,
        startTime: `${format(new Date(), "yyyy-MM-dd")}`,
        endTime: `${format(new Date(), "yyyy-MM-dd")}`,
        content: "",
        units: "",
        name: "",
        phone: "",
        relation: "",
        scope: ""
      },
      worker: {
        name: "彭晓薇",
        phone: 13423678765
      }
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    setTime(timeType) {
      this.show = true;
      this.timeType = timeType;
    },
    timeConfirm() {
      this.form[this.timeType] = `${format(this.time, "yyyy-MM-dd")}`;
      this.show = false;
    },
    timeCancel() {
      this.time = new Date(this.form[this.timeType]);
      this.show = false;
    },
    beforeRead(file) {
      const i = file.type.indexOf("image");
      if (i !== 0) {
        this.$toast.fail("请上传\n图片类型文件");
      }
      return i === 0;
    },
    cancel() {
      this.$toast.fail({
        message: "已取消代上传请假信息",
        duration: 500,
        onClose: () => {
          this.$router.go(-1);
        }
      });
    },
    confirm() {
      const loading = this.$toast.loading({
        mask: true,
        message: "代上传\n请假信息中"
      });
      setTimeout(() => {
        loading.clear();
        this.$toast.success({
          message: "代上传\n请假信息成功",
          duration: 500,
          onClose: () => {
            this.$router.go(-1);
          }
        });
      }, 2000);
    }
  }
};
</script>

<style lang="stylus" scoped>
.van-cell-group
  border-bottom 10px solid #f2f2f2

  &.van-cell-group--mini
    border-bottom 3px solid #f2f2f2

.van-divider
  color #999999
  border-color #999999
  padding 0 16px 3px
  margin 0
  background #f2f2f2

.van-popup
  height 270px

.van-icon
  line-height 25px
  font-size 16px
  margin-left 10px

.van-uploader
  height 80px
  width 100%

.van-radio
  margin-right 5px
  align-items flex-start
  padding-top 2px

.van-button
  padding 0 50px

.urinalysis__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center

.van-radio-group
  display flex
  justify-content space-around
</style>
