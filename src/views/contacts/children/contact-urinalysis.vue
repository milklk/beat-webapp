<template>
  <!-- eslint-disable -->
  <section class="urinalysis">
    <div class="urinalysis-main">
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell
          title="尿检记录"
          :value="total"
          is-link
          :to="{ name: 'contact-record', params: { header: '尿检记录', id: $route.params.id } }"
        />
      </van-cell-group>
      <van-divider class="van-divider">代上传尿检信息</van-divider>
      <van-cell-group class="van-cell-group van-cell-group--mini">
        <van-cell required title="尿检时间" :value="form.checkTime" @click="setTime">
          <template #right-icon>
            <van-icon class="van-icon" name="add-o" />
          </template>
        </van-cell>
        <van-field v-model="form.area" label="尿检结果" required>
          <template #input>
            <van-radio-group v-model="form.checkResult" class="van-radio-group">
              <van-radio name="0">阳性</van-radio>
              <van-radio name="1">阴性</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <Update :file.sync="file" label="尿检单" />
        <van-field v-model="form.checkAddress" label="尿检地点" placeholder="请输入尿检地址" required />
        <van-field
          v-model="form.checkRemark"
          required
          label="代上传事由"
          type="textarea"
          placeholder="请输入代上传事由"
          rows="3"
          maxlength
          error-message="提示：代上传事由输入字数不多于200字"
        />
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
          <van-cell title="以上尿检信息属实，由本人代上传尿检信息。" @click="radio=radio === false ? true : false">
            <template #icon>
              <van-radio class="van-radio" :name="true" />
            </template>
          </van-cell>
        </van-radio-group>
      </Worker>
    </div>
    <footer class="urinalysis__footer">
      <van-button class="van-button" @click="cancel">取消</van-button>
      <van-button class="van-button" type="primary" @click="confirm">确认</van-button>
    </footer>
  </section>
</template>

<script>
import Worker from "../../../components/worker/worker";
import Update from "../../../components/update/update";
import { urineAdd, urineRecord, fileAdd } from "../../../api";
import { format } from "../../../utils/date.js";
export default {
  name: "contact-urinalysis",
  props: {},
  data() {
    return {
      total: 0,
      show: false,
      time: new Date(),
      file: {},
      radio: true,
      form: {
        checkTime: `${format(new Date(), "yyyy-MM-dd")}`,
        checkResult: "1",
        checkAddress: "",
        checkRemark: "",
        archivesCode: this.$route.params.id,
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
    const record = await urineRecord(id);
    if (record.ret === "200") {
      this.total = record.data.total;
    }
  },
  methods: {
    setTime() {
      this.show = true;
      this.checkTime = new Date(this.form.checkTime);
    },
    timeConfirm() {
      this.form.checkTime = `${format(this.time, "yyyy-MM-dd")}`;
      this.show = false;
    },
    timeCancel() {
      this.show = false;
    },
    cancel() {
      this.$toast.fail({
        message: "已取消代上传尿检信息",
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
          message: "代上传\n尿检信息中"
        });
        const file = await fileAdd(this.file);
        if (file.ret === "200") {
          this.form.fileIdTmp = file.data;
          const urinalysis = await urineAdd(
            this.form.checkTime,
            this.form.checkResult,
            this.form.checkAddress,
            this.form.checkRemark,
            this.form.archivesCode,
            this.form.fileIdTmp
          );
          if (urinalysis.ret === "200") {
            loading.clear();
            this.$toast.success({
              message: "代上传\n尿检信息成功",
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

.urinalysis-main
  min-height calc( 100vh - 54px - 46px + 46px - 100px )

.urinalysis__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center

.van-radio-group
  display flex
  justify-content space-around
</style>
