<template>
  <van-nav-bar :title="title" fixed left-arrow @click-left="onClickLeft" />
</template>

<script>
export default {
  name: "header-bar",
  props: {},
  data() {
    return {
      title: "首页"
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
