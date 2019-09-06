<template>
  <section class="home-notices">
    <List v-if="$route.path === '/home/notices'" children="home-notice" />
    <router-view />
  </section>
</template>

<script>
import List from "../../../../components/list/list";
export default {
  name: "home-notices",
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
