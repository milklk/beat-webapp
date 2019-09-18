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
        <!-- eslint-disable-next-line -->
        <van-field v-model="form.ids" label="评估人员" placeholder="请输入评估人员" required />
        <Update :file.sync="file" label="评估照片" />
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
          <van-cell title="以上评估情况属实，由本人上传评估情况。" @click="radio=radio === false ? true : false">
            <template #icon>
              <van-radio class="van-radio" :name="true" />
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
import { personAssessAdd, fileAdd, personAssessRecord } from "../../../api";
import { format } from "../../../utils/date.js";
export default {
  name: "contact-assess",
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
        assessTitle: "",
        assessRemark: "",
        assessTime: `${format(new Date(), "yyyy-MM-dd")}`,
        ids: "",
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
    const record = await personAssessRecord(id);
    if (record.ret === "200") {
      this.total = record.data.total ? record.data.total : record.data.length;
    }
  },
  methods: {
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
        const file = await fileAdd(this.file);
        if (file.ret === "200") {
          this.form.fileIdTmp = file.data;
          const sign = await personAssessAdd(
            this.form.archivesCode,
            this.form.assessTitle,
            this.form.assessRemark,
            this.form.assessTime,
            this.form.ids,
            this.form.fileIdTmp
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

.assess-main
  min-height calc( 100vh - 54px - 46px - 100px )

.assess__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center

.van-radio-group
  display flex
  justify-content space-around
</style>
