<template>
  <section class="visit">
    <div class="visit-main">
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell
          title="拜访记录"
          :value="total"
          is-link
          :to="{
            name: 'contact-record',
            params: { header: '拜访记录', id: $route.params.id }
          }"
        />
      </van-cell-group>
      <van-divider class="van-divider">拜访信息</van-divider>
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <!-- eslint-disable-next-line -->
        <van-cell title="拜访时间" :value="form.visitTime" @click="setTime" required>
          <template #right-icon>
            <van-icon class="van-icon" name="add-o" />
          </template>
        </van-cell>
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.ids" label="同行人员" placeholder="请输入同行人员" required />
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.visitTitle" label="拜访摘要" placeholder="请输入拜访摘要" required />
        <van-field
          v-model="form.visitContent"
          required
          label="拜访内容"
          type="textarea"
          placeholder="请输入拜访内容"
          rows="3"
          maxlength
          error-message="提示：拜访内容输入字数不多于200字"
        />
        <Update :fileIdTmp.sync="form.fileIdTmp" label="拜访现场照片" />
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
          <van-cell title="以上拜访情况属实，由本人上传拜访情况。" @click="radio=radio === false ? true : false">
            <template #icon>
              <van-radio class="van-radio" :name="true" disabled />
            </template>
          </van-cell>
        </van-radio-group>
      </Worker>
    </div>
    <footer class="visit__footer">
      <van-button class="van-button" @click="cancel">取消</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="primary" @click="confirm">确认</van-button>
    </footer>
  </section>
</template>

<script>
import Worker from "../../../components/worker/worker";
import Update from "../../../components/update/update";
import { personVisitAdd, personVisitRecord } from "../../../api";
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
      form: {
        archivesCode: this.$route.params.id,
        visitTitle: "",
        visitContent: "",
        visitTime: `${format(new Date(), "yyyy-MM-dd")}`,
        fileIdTmp: [],
        ids: ""
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
    const record = await personVisitRecord(id);
    if (record.ret === "200") {
      this.total = record.data.total;
    }
  },
  methods: {
    setTime() {
      this.show = true;
      this.time = new Date(this.form.visitTime);
    },
    timeConfirm() {
      this.form.visitTime = `${format(this.time, "yyyy-MM-dd")}`;
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
        message: "已取消上传拜访情况",
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
          message: "上传\n拜访情况中"
        });

        const visit = await personVisitAdd(
          this.form.archivesCode,
          this.form.visitTitle,
          this.form.visitContent,
          this.form.visitTime,
          this.form.fileIdTmp,
          this.form.ids
        );
        if (visit.ret === "200") {
          loading.clear();
          this.$toast.success({
            message: "上传\n拜访情况成功",
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

.visit-main
  min-height calc( 100vh - 54px - 46px + 46px - 100px )

.visit__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center

.van-radio-group
  display flex
  justify-content space-around
</style>
