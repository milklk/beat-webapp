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
          :value="form.medicineTime"
          @click="setTime"
        >
          <template #right-icon>
            <van-icon class="van-icon" name="add-o" />
          </template>
        </van-cell>
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.medicineName" label="药物名称" placeholder="请输入药物名称" required />

        <!-- eslint-disable-next-line -->
        <van-field v-model="form.treatArea" label="药物治疗地点" placeholder="请输入药物治疗地点" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.doctor" label="主治医师" placeholder="请输入医务人员姓名" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.doctorMobile" label="医师电话" placeholder="请输入医务人员电话" required />
        <Update :fileIdTmp.sync="form.fileIdTmp" label="药物治疗图像" />

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
import { personMedicationAdd, personMedicationRecord } from "../../../api";
import { format } from "../../../utils/date.js";
export default {
  name: "contact-helping",
  props: {},
  data() {
    return {
      total: 0,
      show: false,
      time: new Date(),

      radio: false,
      form: {
        archivesCode: this.$route.params.id,
        medicineName: "",
        medicineTime: `${format(new Date(), "yyyy-MM-dd")}`,
        treatArea: "",
        doctor: "",
        doctorMobile: "",
        fileIdTmp: []
      },
      error: [
        { key: "medicineName", message: "未填写药物名称" },
        { key: "treatArea", message: "未填写药物治疗地点" },
        { key: "doctor", message: "未填写主治医师" },
        { key: "doctorMobile", message: "未填写医师电话" }
      ]
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
      this.total = record.data.length;
    }
  },
  methods: {
    setTime() {
      this.time = new Date(this.form.medicineTime);
      this.show = true;
    },
    timeConfirm() {
      this.form.medicineTime = `${format(this.time, "yyyy-MM-dd")}`;
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
        if (!this.form.fileIdTmp.length) {
          this.$toast.fail("未上传药物治疗图像");
          return false;
        }
        const sign = await personMedicationAdd(
          this.form.archivesCode,
          this.form.medicineName,
          this.form.medicineTime,
          this.form.treatArea,
          this.form.doctor,
          this.form.doctorMobile,
          this.form.fileIdTmp
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
