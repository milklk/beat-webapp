<template>
  <section class="join">
    <div class="join__main">
      <!-- 吸毒人员 -->
      <van-cell-group class="van-cell-group">
        <van-cell title="姓名" :value="detail.name"></van-cell>
        <!-- eslint-disable-next-line -->
        <van-cell v-for="(d,i) in addict" :key="i" :title="d.title" :value="detail[d.value]" />
      </van-cell-group>
      <!-- 经办人 -->
      <!-- <van-cell-group class="van-cell-group"> -->
      <!-- eslint-disable-next-line -->
      <!-- <van-cell v-for="(d,i) in handle" :key="i" :title="d.title" :value="detail[d.value]" />
        <van-cell title="是否见到本人">
        <van-switch
          v-model="checked"
          class="van-switch"
          disabled
          active-color="#07c160"
          inactive-color="#f44"
        />
      </van-cell>
        <van-cell title="描述内容" label="精神状态良好，xxxxxxxxxxxxx" />
      </van-cell-group>-->
      <!-- 社工 -->
      <van-cell-group class="van-cell-group">
        <!-- eslint-disable-next-line -->
        <van-cell v-for="(d,i) in worker" :key="i" :title="d.title" :value="workerData[d.value]" />
      </van-cell-group>
    </div>
    <!-- 衔接操作 -->
    <footer class="join__footer">
      <van-button type="danger" @click="dangerClick">拒绝衔接</van-button>
      <van-button type="primary" @click="primaryClick">确认衔接</van-button>
      <!-- eslint-disable-next-line -->
      <van-dialog
        class="van-dialog"
        v-model="primaryShow"
        show-cancel-button
        title="确认衔接"
        @confirm="confirm"
        @cancel="cancel"
      >
        <van-cell-group class="van-cell-group--dialog">
          <!-- eslint-disable-next-line -->
          <van-cell
            class="van-cell--auto"
            required
            title="衔接时间"
            :value="primary.joinTime"
            @click="setTime"
          >
            <template #right-icon>
              <van-icon class="van-icon" name="add-o" />
            </template>
          </van-cell>
          <!-- eslint-disable-next-line -->
          <van-field v-model="primary.joinArea" label="衔接地点" placeholder="请输入衔接地点" required />
          <van-popup v-model="show" round position="bottom" class="van-popup" get-container="main">
            <van-datetime-picker
              v-model="time"
              type="date"
              @confirm="timeConfirm"
              @cancel="timeCancel"
            />
          </van-popup>
        </van-cell-group>
      </van-dialog>
      <van-dialog
        class="van-dialog"
        v-model="dangerShow"
        title="拒绝原因"
        show-cancel-button
        @confirm="confirm"
        @cancel="cancel"
      >
        <van-field
          type="textarea"
          :autosize="{ maxHeight: 150, minHeight: 50 }"
          maxlength="200"
          rows="3"
          v-model="value"
          placeholder="请输入拒绝原因,字数少于200"
          error-message="提示：输入字数应少于200"
        />
      </van-dialog>
    </footer>
  </section>
</template>

<script>
import {
  joinsDetail,
  mineDetail,
  joinsUpdateFalse,
  joinsUpdateTrue
} from "../../../../api";
import { format } from "../../../../utils/date";
export default {
  name: "",
  props: {},
  data() {
    return {
      checked: true,
      primaryShow: false,
      dangerShow: false,
      show: false,
      time: "",
      value: "",
      addict: [
        {
          title: "身份证号",
          value: "idcard"
        },
        {
          title: "联系方式",
          value: "mobile"
        },
        {
          title: "出所日期",
          value: "outTime"
        },
        {
          title: "当前状态",
          value: "type"
        }
      ],
      handle: [
        {
          title: "经办人",
          value: "agentUser"
        },
        {
          title: "经办单位",
          value: "agentOrg"
        }
      ],
      worker: [
        {
          title: "社工姓名",
          value: "account"
        },
        {
          title: "联系方式",
          value: "userMobile"
        }
      ],
      workerData: {},
      detail: {},
      primary: {
        joinTime: `${format(new Date(), "yyyy-MM-dd")}`,
        joinArea: ""
      },
      refuse: "",
      id: ""
    };
  },
  components: {},
  computed: {},
  async created() {
    const idcard = this.$route.params.id;
    const detail = await joinsDetail(idcard);
    if (detail.ret === "200") {
      detail.data[0].type =
        detail.data[0].type === "1" ? "社区戒毒" : "社区康复";

      this.detail = detail.data[0];

      this.id = this.detail.id;
    }
    const mine = await mineDetail();
    if (mine.ret === "200") {
      this.workerData = mine.data;
    }
  },
  methods: {
    setTime() {
      this.show = true;
      this.time = new Date(this.primary.joinTime);
    },
    timeConfirm() {
      this.primary.joinTime = `${format(this.time, "yyyy-MM-dd")}`;
      this.show = false;
    },
    timeCancel() {
      this.show = false;
    },
    dangerClick() {
      this.dangerShow = true;
      this.refuse = "1";
    },
    primaryClick() {
      this.primaryShow = true;
      this.refuse = "2";
    },
    async confirm() {
      const refuse = this.refuse;
      switch (refuse) {
        case "1":
          {
            const loading = this.$toast.loading({
              mask: true,
              message: "拒绝衔接中"
            });
            const show = await joinsUpdateFalse(this.id, this.value);
            if (show.ret === "200") {
              loading.clear();
              this.$toast.success({
                message: "拒绝成功",
                duration: 500,
                onClose: () => {
                  this.$router.go(-1);
                }
              });
            }
          }
          break;
        case "2":
          {
            const loading = this.$toast.loading({
              mask: true,
              message: "确认衔接中"
            });
            const show = await joinsUpdateTrue(
              this.id,
              this.primary.joinTime,
              this.primary.joinArea
            );
            if (show.ret === "200") {
              loading.clear();
              this.$toast.success({
                message: "确认衔接成功",
                duration: 500,
                onClose: () => {
                  this.$router.go(-1);
                }
              });
            }
          }
          break;
        default:
          break;
      }
    },
    cancel() {
      this.$toast.fail({ message: "已取消提交", duration: 500 });
    }
  }
};
</script>

<style lang="stylus" scoped>
.van-cell-group
  border-bottom 10px solid #f2f2f2

.van-cell-group--dialog
  border-bottom none

.van-tag
  height 20px
  margin 2px 0 0 10px

.van-switch
  font-size 22px !important

.van-dialog
  top 30%

.van-icon
  line-height 25px
  font-size 16px
  margin-left 10px

.join__main
  min-height calc( 100vh - 55px - 46px + 46px )

.join__footer
  padding 5px
  display flex
  justify-content space-around
  align-items center
</style>
