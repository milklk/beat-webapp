<template>
  <section class="sign-in">
    <div class="sign-in-main">
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell
          title="签到记录"
          :value="total"
          is-link
          :to="{
          name: 'contact-record',
          params: { header: '签到记录', id: $route.params.id }
        }"
        />
      </van-cell-group>
      <van-divider class="van-divider">代上传签到信息</van-divider>
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell required title="签到时间" :value="form.signTime" @click="setTime">
          <template #right-icon>
            <van-icon class="van-icon" name="add-o" />
          </template>
        </van-cell>
        <Update :file.sync="file" label="签到图像" />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.signRemark" label="签到地址" placeholder="请输入签到地址" required />
        <van-field
          v-model="form.content"
          required
          label="代签事由"
          type="textarea"
          placeholder="请输入代签事由"
          rows="3"
          maxlength
          error-message="提示：代签事由输入字数不多于200字"
        />
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
          <van-cell title="以上签到信息属实，由本人代上传签到信息。" @click="radio=radio === false ? true : false">
            <template #icon>
              <van-radio class="van-radio" :name="true" />
            </template>
          </van-cell>
        </van-radio-group>
      </Worker>
    </div>
    <footer class="sign-in__footer">
      <van-button class="van-button" @click="cancel">取消</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="primary" @click="confirm">确认</van-button>
    </footer>
  </section>
</template>

<script>
import Worker from "../../../components/worker/worker";
import Update from "../../../components/update/update";
import { personSignAdd, fileAdd, personSignRecord } from "../../../api";
import { format } from "../../../utils/date.js";
export default {
  name: "contact-sign-in",
  props: {},
  data() {
    return {
      total: 0,
      show: false,
      time: new Date(),
      file: {},
      radio: true,
      form: {
        archivesCode: this.$route.params.id,
        signTime: `${format(new Date(), "yyyy-MM-dd")}`,
        signAddress: "",
        signRemark: "",
        fileIdTmp: ""
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
    const record = await personSignRecord(id);
    if (record.ret === "200") {
      this.total = record.data.total;
    }
  },
  methods: {
    setTime() {
      this.time = new Date(this.form.signTime);
      this.show = true;
    },
    timeConfirm() {
      this.form.signTime = `${format(this.time, "yyyy-MM-dd")}`;
      this.show = false;
    },
    timeCancel() {
      this.show = false;
    },
    cancel() {
      this.$toast.fail({
        message: "已取消代签到",
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
          message: "代签到中"
        });
        const file = await fileAdd(this.file);
        if (file.ret === "200") {
          this.form.fileIdTmp = file.data;
          const sign = await personSignAdd(
            this.form.archivesCode,
            this.form.signTime,
            this.form.signAddress,
            this.form.signRemark,
            this.form.fileIdTmp
          );
          if (sign.ret === "200") {
            loading.clear();
            this.$toast.success({
              message: "代签到成功",
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

.van-radio
  margin-right 5px
  align-items flex-start
  padding-top 2px

.van-button
  padding 0 50px

.sign-in-main
  min-height calc( 100vh - 54px - 46px - 100px )

.sign-in__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center
</style>
