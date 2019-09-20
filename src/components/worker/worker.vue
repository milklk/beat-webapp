<template>
  <van-cell-group class="van-cell-group">
    <van-cell title="社工姓名" :value="realname" />
    <van-cell title="联系电话" :value="userMobile" />
    <slot></slot>
  </van-cell-group>
</template>

<script>
import { mineDetail } from "../../api";
export default {
  name: "worker",
  props: {},
  data() {
    return {
      realname: "",
      userMobile: ""
    };
  },
  components: {},
  computed: {},
  async created() {
    const worker = await mineDetail();
    if (worker.ret === "200") {
      console.log(worker);
      this.realname = worker.data.realname;
      this.userMobile = worker.data.userMobile;
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.van-cell-group
  border-bottom 10px solid #f2f2f2
</style>
