<template>
  <section class="agreement">
    <div class="agreement-main">
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell
          title="告诫信息记录"
          class="van-cell--auto"
          :value="total"
          is-link
          :to="{
            name: 'contact-record',
            params: { header: '告诫信息记录', id: $route.params.id }
          }"
        />
      </van-cell-group>
      <van-divider class="van-divider">告诫信息</van-divider>
      <!-- eslint-disable-next-line -->
      <van-field v-model="form.violationRemark" label="违反协议摘要" placeholder="请输入违反协议摘要" required />
      <van-field
        v-model="form.warnRemark"
        required
        label="违反协议内容"
        type="textarea"
        placeholder="请输入违反协议内容"
        rows="3"
        maxlength
        error-message="提示：违反协议内容输入字数不多于200字"
      />
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell
          class="van-cell--auto"
          required
          title="违反协议登记时间"
          :value="form.issueDate"
          @click="setTime"
        >
          <template #right-icon>
            <van-icon class="van-icon" name="add-o" />
          </template>
        </van-cell>
        <!-- eslint-disable-next-line -->
        <van-cell class="van-cell--auto" required title="违反协议类型">
          <van-dropdown-menu class="van-dropdown-menu">
            <van-dropdown-item
              v-model="form.warnType"
              :options="type"
              title-class="van-dropdown-title"
            />
          </van-dropdown-menu>
        </van-cell>
        <Update :fileIdTmp.sync="form.fileIdTmp" label="违反协议照片" />
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
          <van-cell title="以上告诫信息情况属实，由本人上传告诫信息情况。" @click="radio=radio === false ? true : false">
            <template #icon>
              <van-radio class="van-radio" :name="true" disabled />
            </template>
          </van-cell>
        </van-radio-group>
      </Worker>
    </div>
    <footer class="agreement__footer">
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
  personViolationAdd,
  personViolationRecord,
  personViolationType
} from "../../../api";
import { format } from "../../../utils/date.js";
export default {
  name: "contact-agreement",
  props: {},
  data() {
    return {
      total: 0,
      show: false,
      time: new Date(),
      type: [],
      radio: false,
      form: {
        archivesCode: this.$route.params.id,
        violationRemark: "",
        warnRemark: "",
        issueDate: `${format(new Date(), "yyyy-MM-dd")}`,
        fileIdTmp: [],
        warnType: ""
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
    const record = await personViolationRecord(id);
    if (record.ret === "200") {
      this.total = record.data.length;
    }
    const type = await personViolationType();
    if (type.ret === "200") {
      type.data.forEach(d => {
        d.text = d.value;
        d.value = d.code;
      });
      this.type = type.data;
      this.form.warnType = type.data[0].value;
    }
  },
  methods: {
    setTime() {
      this.show = true;
      this.time = new Date(this.form.issueDate);
    },
    timeConfirm() {
      this.form.issueDate = `${format(this.time, "yyyy-MM-dd")}`;
      this.show = false;
    },
    timeCancel() {
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
        message: "已取消上传告诫信息",
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
          message: "上传\n告诫信息中"
        });

        const sign = await personViolationAdd(
          this.form.archivesCode,
          this.form.violationRemark,
          this.form.warnRemark,
          this.form.issueDate,
          this.form.fileIdTmp
        );
        if (sign.ret === "200") {
          loading.clear();
          this.$toast.success({
            message: "上传\n告诫信息情况成功",
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

.van-dropdown-menu
  height 100%
  justify-content flex-end

.agreement-main
  min-height calc( 100vh - 54px - 46px + 46px - 100px )

.agreement__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center

.van-radio-group
  display flex
  justify-content space-around
</style>
<style lang="stylus">
.van-dropdown-menu .van-dropdown-menu__item
  justify-content flex-end
  padding-right 10px

.van-dropdown-title
  color #969799 !important
  font-size 3.73vw !important
  padding 0 11px !important
</style>
