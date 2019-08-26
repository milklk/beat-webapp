<template>
  <section>
    <van-cell-group v-show="$route.path === '/publicity'">
      <van-cell title="法律法规" is-link to="/publicity/laws" />
      <van-cell title="禁毒知识" is-link to="/publicity/knowledges" />
      <van-cell title="工作技巧" is-link to="/publicity/skills" />
    </van-cell-group>
    <router-view />
  </section>
</template>

<script>
export default {
  name: "publicity",
  props: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped></style>
