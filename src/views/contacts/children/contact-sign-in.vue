<template>
  <section class="sign-in">
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
      <van-cell required title="签到时间" :value="form.time" @click="setTime">
        <template #right-icon>
          <van-icon class="van-icon" name="add-o" />
        </template>
      </van-cell>
      <van-field v-model="form.area" label="签到图像" required>
        <template #input>
          <van-uploader
            v-model="file"
            :max-count="1"
            class="van-uploader"
            :before-read="beforeRead"
            upload-text="请上传JPG或PNG图片"
          />
        </template>
      </van-field>
      <!-- eslint-disable-next-line -->
      <van-field v-model="form.area" label="签到地址" placeholder="请输入签到地址" required />
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
    <van-cell-group class="van-cell-group">
      <van-cell title="社工姓名" :value="worker.name" />
      <van-cell title="联系电话" :value="worker.phone" />
      <van-radio-group v-model="radio">
        <!-- eslint-disable-next-line -->
        <van-cell title="以上签到信息属实，由本人代上传签到信息。" @click="radio=radio === false ? true : false">
          <template #icon>
            <van-radio class="van-radio" :name="true" />
          </template>
        </van-cell>
      </van-radio-group>
    </van-cell-group>
    <footer class="sign-in__footer">
      <van-button class="van-button" @click="cancel">取消</van-button>
      <!-- eslint-disable-next-line -->
      <van-button class="van-button" type="primary" @click="confirm">确认</van-button>
    </footer>
  </section>
</template>

<script>
import { format } from "../../../utils/date.js";
export default {
  name: "contact-sign-in",
  props: {},
  data() {
    return {
      total: 3,
      show: false,
      time: new Date(),
      file: [],
      radio: true,
      form: {
        time: `${format(new Date(), "yyyy-MM-dd")}`,
        area: "",
        content: "",
        file: ""
      },
      worker: {
        name: "彭晓薇",
        phone: 13423678765
      }
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    setTime() {
      this.show = true;
    },
    timeConfirm() {
      this.form.time = `${format(this.time, "yyyy-MM-dd")}`;
      this.show = false;
    },
    timeCancel() {
      this.time = new Date(this.form.time);
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
        message: "已取消代签到",
        duration: 500,
        onClose: () => {
          this.$router.go(-1);
        }
      });
    },
    confirm() {
      const loading = this.$toast.loading({
        mask: true,
        message: "代签到中"
      });
      setTimeout(() => {
        loading.clear();
        this.$toast.success({
          message: "代签到成功",
          duration: 500,
          onClose: () => {
            this.$router.go(-1);
          }
        });
      }, 2000);
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

.sign-in__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center
</style>
