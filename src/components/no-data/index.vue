<template>
  <section class="no-data">
    <van-icon name="description" size="100px" color="#ccc" />
    <div class="no-data__label">{{ label }}</div>
  </section>
</template>

<script>
export default {
  name: "no-data",
  props: {
    label: String
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

<style lang="stylus" scoped>
.no-data
  width 200px
  height 150px
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  margin auto
  display flex
  flex-direction column
  justify-content space-between
  align-items center

  .no-data__label
    font-size 20px
    color #cccccc
</style>
