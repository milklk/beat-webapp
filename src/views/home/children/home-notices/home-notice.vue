<template>
  <section class="notice">
    <!-- eslint-disable-next-line -->
    <article-text :title="title" :source="source" :time="time" :content="content" />
  </section>
</template>

<script>
import ArticleText from "../../../../components/article-text/article-text";
import { noticesDetail } from "../../../../api";
import { format } from "../../../../utils/date";
export default {
  name: "home-notice",
  props: {},
  data() {
    return {
      title: "",
      source: "",
      time: "",
      content: ""
    };
  },
  components: {
    ArticleText
  },
  computed: {},
  async created() {
    const noticeId = this.$route.params.id;
    const notice = await noticesDetail(noticeId);
    if (notice.ret === "200") {
      const article = notice.data.list[0];
      this.title = article.title;
      this.source = article.source;
      this.content = article.content;
      this.time = format(article.updateTime);
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.notice
  background #fff
</style>
