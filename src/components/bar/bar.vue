<template>
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
      const header = this.$route.meta.header;
      this.title = header ? header : "";
    }
  },
  created() {
    const header = this.$route.meta.header;
    this.title = header ? header : "";
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
