<template>
  <!-- app-header -->
  <van-nav-bar :title="title" fixed left-arrow @click-left="onClickLeft" />
</template>

<script>
export default {
  name: "header-bar",
  props: {},
  data() {
    return {
      title: ""
    };
  },
  components: {},
  computed: {},
  watch: {
    $route() {
      this.$_setTitle();
    }
  },
  created() {
    this.$_setTitle();
  },
  methods: {
    // 返回上一路由
    onClickLeft() {
      this.$router.go(-1);
    },
    // 更新头部标题
    $_setTitle() {
      const header = this.$route.meta.header;
      this.title = header ? header : "";
    }
  }
};
</script>

<style lang="stylus" scoped></style>
