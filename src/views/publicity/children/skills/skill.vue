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
  name: "publicity-skill",
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
    const skillId = this.$route.params.id;
    const skill = await knowledgeDetail(skillId);
    if (skill.ret === "200") {
      const article = skill.data.list[0];
      this.title = article.title;
      this.source = article.keyword;
      this.content = article.content;
      this.time = format(article.updateTime);
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>
