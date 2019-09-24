<template>
  <section class="find">
    <div class="find-main">
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell
          title="查找脱失记录"
          class="van-cell--auto"
          :value="total"
          is-link
          :to="{
            name: 'contact-record',
            params: { header: '查找脱失记录', id: $route.params.id }
          }"
        />
      </van-cell-group>
      <van-divider class="van-divider">查找脱失信息</van-divider>
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <!-- eslint-disable-next-line -->
        <van-cell
          class="van-cell--auto"
          required
          title="查找脱失时间"
          :value="form.findTime"
          @click="setTime"
        >
          <template #right-icon>
            <van-icon class="van-icon" name="add-o" />
          </template>
        </van-cell>
        <!-- eslint-disable-next-line -->
        <van-field
          v-model="form.colleagueUser"
          label="同行人员"
          placeholder="请输入同行人员"
          required
          error-message="提示：多个人员之间使用逗号(,)隔开"
        />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.findTitle" label="查找脱失摘要" placeholder="请输入查找脱失摘要" required />
        <van-field
          v-model="form.findContent"
          required
          label="查找脱失内容"
          type="textarea"
          placeholder="请输入查找脱失内容"
          rows="3"
          maxlength
          error-message="提示：查找脱失内容输入字数不多于200字"
        />
        <Update :fileIdTmp.sync="form.fileIdTmp" label="查找脱失照片" />
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
          <van-cell title="以上查找脱失情况属实，由本人上传查找脱失情况。" @click="radio=radio === false ? true : false">
            <template #icon>
              <van-radio class="van-radio" :name="true" disabled />
            </template>
          </van-cell>
        </van-radio-group>
      </Worker>
    </div>
    <footer class="find__footer">
      <van-button class="van-button" @click="cancel">取消</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="primary" @click="confirm">确认</van-button>
    </footer>
  </section>
</template>

<script>
import Worker from "../../../components/worker/worker";
import Update from "../../../components/update/update";
import { personFindAdd, personFindRecord } from "../../../api";
import { format } from "../../../utils/date.js";
export default {
  name: "contact-find",
  props: {},
  data() {
    return {
      total: 0,
      show: false,
      time: new Date(),

      radio: false,
      form: {
        archivesCode: this.$route.params.id,
        findTitle: "",
        findContent: "",
        findTime: `${format(new Date(), "yyyy-MM-dd")}`,
        fileIdTmp: [],
        colleagueUser: ""
      },
      error: [
        { key: "findTitle", message: "未填写查找脱失摘要" },
        { key: "findContent", message: "未填写查找脱失内容" },
        { key: "colleagueUser", message: "未填写同行人员" }
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
    const record = await personFindRecord(id);
    if (record.ret === "200") {
      this.total = record.data.total;
    }
  },
  methods: {
    setTime() {
      this.time = new Date(this.form.findTime);
      this.show = true;
    },
    timeConfirm() {
      this.form.findTime = `${format(this.time, "yyyy-MM-dd")}`;
      this.show = false;
    },
    timeCancel() {
      this.show = false;
    },
    cancel() {
      this.$toast.fail({
        message: "已取消上传查找脱失情况",
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
          message: "上传\n查找脱失情况中"
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
          this.$toast.fail("未上传查找脱失照片");
          return false;
        }

        const sign = await personFindAdd(
          this.form.archivesCode,
          this.form.findTitle,
          this.form.findContent,
          this.form.findTime,
          this.form.colleagueUser
        );
        if (sign.ret === "200") {
          loading.clear();
          this.$toast.success({
            message: "上传\n查找脱失情况成功",
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

.find-main
  min-height calc( 100vh - 54px - 46px + 46px - 100px )

.find__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center

.van-radio-group
  display flex
  justify-content space-around
</style>
