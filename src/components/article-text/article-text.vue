<template>
  <section class="article">
    <!-- 标题以及相关信息 -->
    <h2 class="article__h">{{ title }}</h2>
    <aside class="article__aside">
      <p class="aside__source">
        <span>{{ sourceTitle }}</span>
        ：
        <span>{{ source ? source : "无" }}</span>
      </p>
      <p class="aside__time">日期：{{ time }}</p>
    </aside>
    <!-- 文章内容 -->
    <article class="article__content" v-html="content"></article>
  </section>
</template>

<script>
export default {
  name: "article-text",
  props: {
    title: String,
    source: String,
    time: String,
    content: String,
    sourceTitle: {
      type: String,
      default: "关键词"
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus">
.article__content
  ul
    li
      list-style disc

  ol
    li
      list-style decimal

  img
    width 100%
    padding 0 20px
</style>
<style lang="stylus" scoped>
.article
  padding 20px

.article__h
  font-size 20px
  color #152952
  text-align center

.article__aside
  display flex
  justify-content space-between
  color #737397
  line-height 22px
  margin 10px 0

.article__content
  font-size 15px
  color #737397
  line-height 22px

  *
    text-indent 35px
</style>
