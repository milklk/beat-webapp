<template>
  <section>
    <!-- eslint-disable-next-line -->
    <article-text :title="title" :source="source" :time="time" :content="content" />
  </section>
</template>

<script>
import ArticleText from "../../components/article-text/article-text";
import { notifyDetail } from "../../api";
import { format } from "../../utils/date";
export default {
  name: "message",
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
    const notifyId = this.$route.params.id;
    const notify = await notifyDetail(notifyId);
    if (notify.ret === "200") {
      const article = notify.data.list[0];
      this.title = article.title;
      this.source = article.realname;
      this.content = article.content;
      this.time = format(article.updateTime);
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>
