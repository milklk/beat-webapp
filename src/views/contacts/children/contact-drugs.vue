<template>
  <section class="drugs">
    <div class="drugs-main">
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell
          title="药物维持记录"
          class="van-cell--auto"
          :value="total"
          is-link
          :to="{
            name: 'contact-record',
            params: { header: '药物维持记录', id: $route.params.id }
          }"
        />
      </van-cell-group>
      <van-divider class="van-divider">药物维持信息</van-divider>
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <!-- eslint-disable-next-line -->
        <van-cell
          class="van-cell--auto"
          required
          title="药物维持时间"
          :value="form.useTime"
          @click="setTime"
        >
          <template #right-icon>
            <van-icon class="van-icon" name="add-o" />
          </template>
        </van-cell>
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.name" label="药物名称" placeholder="请输入药物名称" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.useAmount" label="服用剂量" placeholder="请输入服用剂量(默认单位：mg)" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.treatArea" label="药物治疗地点" placeholder="请输入药物治疗地点" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.doctor" label="医务人员" placeholder="请输入医务人员姓名" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.doctorMobile" label="医务人员电话" placeholder="请输入医务人员电话" required />
        <Update :file.sync="tradeTableFile" label="药物治疗单" />
        <Update :file.sync="checkReportFile" label="医学检查报告" />
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
          <van-cell title="以上药物维持情况属实，由本人上传药物维持情况。" @click="radio=radio === false ? true : false">
            <template #icon>
              <van-radio class="van-radio" :name="true" disabled />
            </template>
          </van-cell>
        </van-radio-group>
      </Worker>
    </div>
    <footer class="drugs__footer">
      <van-button class="van-button" @click="cancel">取消</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="primary" @click="confirm">确认</van-button>
    </footer>
  </section>
</template>

<script>
import Worker from "../../../components/worker/worker";
import Update from "../../../components/update/update";
import {
  personMedicationAdd,
  fileAdd,
  personMedicationRecord
} from "../../../api";
import { format } from "../../../utils/date.js";
export default {
  name: "contact-helping",
  props: {},
  data() {
    return {
      total: 0,
      show: false,
      time: new Date(),
      tradeTableFile: {},
      checkReportFile: {},
      radio: false,
      form: {
        archivesCode: this.$route.params.id,
        useTime: `${format(new Date(), "yyyy-MM-dd")}`,
        useAmount: "",
        treatArea: "",
        doctor: "",
        doctorMobile: "",
        tradeTable: "",
        checkReport: ""
      }
    };
  },
  components: {
    Worker,
    Update
  },
  computed: {},
  async created() {
    const id = this.$route.params.id;
    const record = await personMedicationRecord(id);
    if (record.ret === "200") {
      this.total = record.data.total;
    }
  },
  methods: {
    setTime() {
      this.time = new Date(this.form.useTime);
      this.show = true;
    },
    timeConfirm() {
      this.form.useTime = `${format(this.time, "yyyy-MM-dd")}`;
      this.show = false;
    },
    timeCancel() {
      this.show = false;
    },
    cancel() {
      this.$toast.fail({
        message: "已取消上传药物维持情况",
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
          message: "上传\n药物维持情况中"
        });
        const tradeTableFile = await fileAdd(this.tradeTableFile);
        const checkReportFile = await fileAdd(this.checkReportFile);
        if (tradeTableFile.ret === "200" && checkReportFile.ret === "200") {
          this.form.tradeTable = tradeTableFile.data;
          this.form.checkReport = checkReportFile.data;
          const sign = await personMedicationAdd(
            this.form.archivesCode,
            this.form.useTime,
            this.form.useAmount,
            this.form.treatArea,
            this.form.doctor,
            this.form.doctorMobile,
            this.form.tradeTable,
            this.form.checkReport
          );
          if (sign.ret === "200") {
            loading.clear();
            this.$toast.success({
              message: "上传\n药物维持情况成功",
              duration: 500,
              onClose: () => {
                this.$router.go(-1);
              }
            });
          }
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

.drugs-main
  min-height calc( 100vh - 54px - 46px + 46px - 100px )

.drugs__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center

.van-radio-group
  display flex
  justify-content space-around
</style>
