
<template>
  <section class="messages">
    <List v-show="$route.path === '/messages'" children="message" />
    <router-view />
  </section>
</template>

<script>
import List from "../../components/list/list";
export default {
  name: "messages",
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
