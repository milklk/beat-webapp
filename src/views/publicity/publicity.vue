<template>
  <section class="publicity">
    <van-cell-group v-show="$route.path === '/publicity'">
      <!-- eslint-disable-next-line -->
      <van-cell v-for="item in types" :key="item.type" :title="item.name" is-link :to="item.to" />
    </van-cell-group>
    <router-view />
  </section>
</template>

<script>
import { knowledgeType } from "../../api";
export default {
  name: "publicity",
  props: {},
  data() {
    return {
      types: []
    };
  },
  components: {},
  computed: {},
  async created() {
    const types = await knowledgeType();
    const links = [
      "/publicity/laws",
      "/publicity/knowledges",
      "/publicity/skills"
    ];
    if (types.ret === "200") {
      types.data.forEach(d => {
        d.to = { path: links[Number(d.type) - 1], query: { type: d.type } };
      });
      this.types = types.data;
    }
  },
  methods: {}
};
</script>

<style lang="stylus">
.publicity
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after
    border-top 0 solid #ffffff
</style>
