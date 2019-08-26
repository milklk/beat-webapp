<template>
  <section class="hand">
    <van-search
      placeholder="请输入搜索关键词"
      v-model="search"
      shape="round"
      background="#f2f2f2"
      @search="submit"
    />
    <article class="hands__list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
      >
        <van-checkbox-group v-model="result">
          <van-cell
            v-for="(item, i) in list"
            :key="i"
            :value="item.phone"
            class="van-cell--checkbox"
          >
            <template #title>
              <van-checkbox v-model="checked" :name="i">
                <!-- eslint-disable-next-line -->
                <div class="van-checkbox__label">{{ item.name }}({{ item.area }})</div>
              </van-checkbox>
            </template>
          </van-cell>
        </van-checkbox-group>
      </van-list>
    </article>
    <van-button class="van-button" type="info">确认移交</van-button>
  </section>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      loading: false,
      finished: true,
      result: [],
      search: "",
      checked:[],
      list: [
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20,
          status: "脱失"
        },
        {
          name: "张怀志",
          area: "临桂区",
          card: "45505319******1100",
          phone: "18907711179",
          risk: 20
        }
      ]
    };
  },
  components: {},
  computed: {},
  created() {
    const params = this.$route.params
    if (!params.id) {
      this.$router.go(-1)
    }
  },
  methods: {
    submit() {}
  }
};
</script>

<style lang="stylus" scoped>
.van-button
  display block
  width 260px
  text-align center
  margin auto

.van-checkbox__label
  color #737392
  line-height 25px
</style>
