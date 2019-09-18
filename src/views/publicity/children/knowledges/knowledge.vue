<template>
  <section>
    <!-- eslint-disable-next-line -->
    <article-text :title="title" :source="source" :time="time" :content="content" />
  </section>
</template>

<script>
import ArticleText from "../../../../components/article-text/article-text";
import { knowledgeDetail } from "../../../../api";
import { format } from "../../../../utils/date";
export default {
  name: "publicity-knowledge",
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
    const knowledgeId = this.$route.params.id;
    const knowledge = await knowledgeDetail(knowledgeId);
    if (knowledge.ret === "200") {
      const article = knowledge.data.list[0];
      this.title = article.title;
      this.source = article.sendName;
      this.content = article.content;
      this.time = format(article.updateTime);
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>
