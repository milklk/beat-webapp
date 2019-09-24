<template>
  <section class="assess">
    <div class="assess-main">
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell
          title="评估记录"
          class="van-cell--auto"
          :value="total"
          is-link
          :to="{
            name: 'contact-record',
            params: { header: '评估记录', id: $route.params.id }
          }"
        />
      </van-cell-group>
      <van-divider class="van-divider">评估信息</van-divider>
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <!-- eslint-disable-next-line -->
        <van-cell
          class="van-cell--auto"
          required
          title="评估时间"
          :value="form.assessTime"
          @click="setTime"
        >
          <template #right-icon>
            <van-icon class="van-icon" name="add-o" />
          </template>
        </van-cell>
        <van-cell
          class="van-cell--auto"
          title="风险等级评估"
          :value="riskLevelName"
          @click="setRiskLevelShow"
        >
          <template #right-icon>
            <van-icon class="van-icon" name="add-o" />
          </template>
        </van-cell>
        <!-- eslint-disable-next-line -->
        <van-field
          v-model="form.colleagueUser"
          label="评估人员"
          placeholder="请输入评估人员"
          required
          error-message="提示：多个人员之间使用逗号(,)隔开"
        />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.assessTitle" label="评估摘要" placeholder="请输入评估摘要" required />
        <van-field
          v-model="form.assessRemark"
          required
          label="评估内容"
          type="textarea"
          placeholder="请输入评估内容"
          rows="3"
          maxlength
          error-message="提示：评估内容输入字数不多于200字"
        />

        <Update :fileIdTmp.sync="form.fileIdTmp" label="评估照片" />
        <!-- eslint-disable-next-line -->
        <van-popup v-model="show" round position="bottom" class="van-popup" get-container="main">
          <van-datetime-picker
            v-model="time"
            type="date"
            @confirm="timeConfirm"
            @cancel="timeCancel"
          />
        </van-popup>
        <!-- eslint-disable-next-line -->
        <van-popup v-model="riskShow" position="bottom" class="van-popup" get-container="main">
          <van-checkbox-group v-model="assessTrueList" @change="setriskLevel">
            <van-cell-group class="van-cell-group--checkbox">
              <van-cell
                v-for="(item, index) in assessList"
                clickable
                :key="item.id"
                :title="item.name"
                :class="`riskLevel-${item.riskLevel}`"
                @click="toggle(index)"
              >
                <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-popup>
      </van-cell-group>
      <van-divider class="van-divider">社工信息</van-divider>
      <Worker>
        <van-radio-group v-model="radio">
          <!-- eslint-disable-next-line -->
          <van-cell title="以上评估情况属实，由本人上传评估情况。" @click="radio=radio === false ? true : false">
            <template #icon>
              <van-radio class="van-radio" :name="true" disabled />
            </template>
          </van-cell>
        </van-radio-group>
      </Worker>
    </div>
    <footer class="assess__footer">
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
  personAssessAdd,
  personAssessRecord,
  socialappraisalList
} from "../../../api";
import { format } from "../../../utils/date.js";
export default {
  name: "contact-assess",
  props: {},
  data() {
    return {
      total: 0,
      show: false,
      riskShow: false,
      time: new Date(),
      radio: false,
      form: {
        archivesCode: this.$route.params.id,
        assessTitle: "",
        assessRemark: "",
        assessTime: `${format(new Date(), "yyyy-MM-dd")}`,
        colleagueUser: "",
        fileIdTmp: [],
        riskLevel: "",
        assessId: [],
        assessName: ""
      },
      assessList: [],
      assessTrueList: [],
      error: [
        { key: "assessTitle", message: "未填写评估摘要" },
        { key: "assessRemark", message: "未填写评估内容" },
        { key: "colleagueUser", message: "未填写评估人员" }
      ]
    };
  },
  components: {
    Worker,
    Update
  },
  computed: {
    riskLevelName() {
      const riskLevelName =
        this.form.riskLevel == "1"
          ? "高风险"
          : this.form.riskLevel == "2"
          ? "中风险"
          : this.form.riskLevel == "3"
          ? "低风险"
          : "未评估";
      return riskLevelName;
    }
  },
  async created() {
    const id = this.$route.params.id;
    const record = await personAssessRecord(id);
    if (record.ret === "200") {
      this.total = record.data.total ? record.data.total : record.data.length;
    }
    const socialappraisas = await socialappraisalList();
    if (socialappraisas.ret === "200") {
      this.assessList = socialappraisas.data.list;
    }
  },
  methods: {
    setRiskLevelShow() {
      this.riskShow = true;
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    setriskLevel() {
      const riskLevels = Array.from(this.assessTrueList).sort(
        (a, b) => a.riskLevel - b.riskLevel
      );
      this.form.riskLevel = riskLevels[0] ? riskLevels[0].riskLevel : "";
      this.form.assessId = riskLevels.map(d => d.id);
      this.form.assessName = riskLevels.map(d => d.name).join("&");
      console.log(this.form.assessName);
    },
    setTime() {
      this.time = new Date(this.form.assessTime);
      this.show = true;
    },
    timeConfirm() {
      this.form.assessTime = `${format(this.time, "yyyy-MM-dd")}`;
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
        message: "已取消上传评估情况",
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
          message: "上传\n评估情况中"
        });
        this.form.colleagueUser.replace(/，/gi, ",");
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
          this.$toast.fail("未上传评估照片");
          return false;
        }
        const sign = await personAssessAdd(
          this.form.archivesCode,
          this.form.assessTitle,
          this.form.assessRemark,
          this.form.assessTime,
          this.form.colleagueUser,
          this.form.fileIdTmp,
          this.form.riskLevel,
          this.form.assessId,
          this.form.assessName
        );
        if (sign.ret === "200") {
          loading.clear();
          this.$toast.success({
            message: "上传\n评估情况成功",
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

.van-cell-group--checkbox
  border-bottom 0

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

.assess-main
  min-height calc( 100vh - 54px - 46px + 46px - 100px )

.assess__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center

.van-radio-group
  display flex
  justify-content space-around

.riskLevel-1
  background #f9ebeb

.riskLevel-2
  background #fdf5e6

.riskLevel-3
  background #f0f9eb
</style>
