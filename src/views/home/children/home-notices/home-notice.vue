<template>
  <section class="notice">
    <article-text />
  </section>
</template>

<script>
import ArticleText from "../../../../components/article-text/article-text";
export default {
  name: "home-notice",
  props: {},
  data() {
    return {};
  },
  components: {
    ArticleText
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
.notice
  background #fff
</style>
