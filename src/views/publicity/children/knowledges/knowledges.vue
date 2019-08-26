<template>
  <section class="messages">
    <List v-show="$route.path === '/publicity/knowledges'" children="publicity-knowledge" />
    <router-view />
  </section>
</template>

<script>
import List from "../../../../components/list/list";
export default {
  name: "publicity-knowledges",
  props: {},
  data() {
    return {};
  },
  components: {
    List
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="stylus" scoped></style>