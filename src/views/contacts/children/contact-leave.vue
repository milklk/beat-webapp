<template>
  <section class="leave">
    <div class="leave-main">
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell
          title="请假记录"
          :value="total"
          is-link
          :to="{
            name: 'contact-record',
            params: {
              header: '请假记录',
              id: $route.params.id
            }
          }"
        />
      </van-cell-group>
      <van-divider class="van-divider">代上传请假信息</van-divider>
      <van-cell-group class="van-cell-group van-cell-group--mini">
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
        <van-field v-model="form.reason" label="请假事由" placeholder="请输入请假事由" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.visitOrg" label="被访对象" placeholder="请输入被访对象" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.visitUserMobile" label="被访对象电话" placeholder="请输入被访对象电话" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.relationship" label="双方关系" placeholder="请输入双方关系" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.activitiyRange" label="活动范围" placeholder="请输入活动范围" required />

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
      <Worker>
        <van-radio-group v-model="radio">
          <!-- eslint-disable-next-line -->
          <van-cell title="以上请假信息属实，由本人代为上传请假信息。" @click="radio=radio === false ? true : false">
            <template #icon>
              <van-radio class="van-radio" :name="true" disabled />
            </template>
          </van-cell>
        </van-radio-group>
      </Worker>
    </div>
    <footer class="leave__footer">
      <van-button class="van-button" @click="cancel">取消</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="primary" @click="confirm">确认</van-button>
    </footer>
  </section>
</template>

<script>
import Worker from "../../../components/worker/worker";
import { personLeaveAdd, personLeaveRecord } from "../../../api";
import { format } from "../../../utils/date.js";
export default {
  name: "contact-visit",
  props: {},
  data() {
    return {
      total: 0,
      show: false,
      time: new Date(),
      radio: false,
      timeType: "",
      form: {
        archivesCode: this.$route.params.id,
        leaveTime: `${format(new Date(), "yyyy-MM-dd")}`,
        reason: "",
        visitOrg: "",
        visitUserMobile: "",
        relationship: "",
        startTime: `${format(new Date(), "yyyy-MM-dd")}`,
        endTime: `${format(new Date(), "yyyy-MM-dd")}`,
        activitiyRange: ""
      },
      error: [
        { key: "reason", message: "未填写请假事由" },
        { key: "visitOrg", message: "未填写被访对象" },
        { key: "visitUserMobile", message: "未填写被访对象电话" },
        { key: "relationship", message: "未填写双方关系" },
        { key: "activitiyRange", message: "未填写活动范围" }
      ]
    };
  },
  components: {
    Worker
  },
  computed: {},
  async created() {
    const id = this.$route.params.id;
    const record = await personLeaveRecord(id);
    if (record.ret === "200") {
      this.total = record.data.total;
    }
  },
  methods: {
    setTime(timeType) {
      this.show = true;
      this.timeType = timeType;
      this.time = new Date(this.form[this.timeType]);
    },
    timeConfirm() {
      this.form[this.timeType] = `${format(this.time, "yyyy-MM-dd")}`;
      this.show = false;
    },
    timeCancel() {
      this.show = false;
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
    async confirm() {
      if (this.radio) {
        const loading = this.$toast.loading({
          mask: true,
          message: "代上传\n请假信息中"
        });
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            const error = this.error.find(d => d.key === key);
            if (error) {
              if (!this.form[key]) {
                this.$toast.fail(error.message);
                return false;
              }
            }
          }
        }
        const leave = await personLeaveAdd(
          this.form.archivesCode,
          this.form.reason,
          this.form.visitOrg,
          this.form.visitUserMobile,
          this.form.relationship,
          this.form.startTime,
          this.form.endTime,
          this.form.activitiyRange
        );
        if (leave.ret === "200") {
          loading.clear();
          this.$toast.success({
            message: "代上传\n请假信息成功",
            duration: 500,
            onClose: () => {
              this.$router.go(-1);
            }
          });
        }
      } else {
        this.$toast.fail({
          message: "未同意相关协议",
          duration: 500
        });
      }
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

.leave-main
  min-height calc( 100vh - 54px - 46px + 46px - 100px )

.leave__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center

.van-radio-group
  display flex
  justify-content space-around
</style>
