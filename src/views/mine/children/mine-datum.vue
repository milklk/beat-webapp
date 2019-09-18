<template>
  <section class="datum">
    <van-cell-group>
      <!-- eslint-disable-next-line -->
      <van-field v-model="realname" label="用户名" placeholder="请输入用户名" />
      <!-- eslint-disable-next-line -->
      <van-field v-model="idCard" label="身份证号" placeholder="请输入身份证号" />
      <!-- eslint-disable-next-line -->
      <van-field v-model="userMobile" label="联系电话" placeholder="请输入联系电话" />
      <!-- eslint-disable-next-line -->
      <van-field v-model="address" label="居住地址" placeholder="请输入居住地址" />
    </van-cell-group>
    <footer class="datum__footer">
      <van-button type="info" size="large" @click="submit">确认修改</van-button>
    </footer>
  </section>
</template>

<script>
import { mineDetail, mineDetailUpdate } from "../../../api";
export default {
  name: "mine-datum",
  props: {},
  data() {
    return {
      id: "",
      realname: "",
      idCard: "",
      userMobile: "",
      address: ""
    };
  },
  components: {},
  computed: {},
  async created() {
    const mine = await mineDetail();
    if (mine.ret === "200") {
      this.id = mine.data.id;
      this.realname = mine.data.account;
      this.idCard = mine.data.idCard;
      this.userMobile = mine.data.userMobile;
      this.address = mine.data.address;
    }
  },
  methods: {
    async submit() {
      const loading = this.$toast.loading({
        mask: true,
        message: "提交修改中"
      });
      const update = await mineDetailUpdate(
        this.id,
        this.realname,
        this.idCard,
        this.userMobile,
        this.address
      );
      if (update.ret === "200") {
        loading.clear();
        this.$toast.success({
          message: "修改成功",
          duration: 500,
          onClose: () => {
            this.$router.push({ path: "/mine" });
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.datum
  height calc( 100vh - 46px + 46px )
  position relative
  top 0
  left 0

.datum__footer
  display block
  position absolute
  bottom 0
  left 0
  right 0
  margin auto
  padding 5px 20px

@media ( max-height: 250px )
  .datum__footer
    display none
</style>
