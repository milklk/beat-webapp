<template>
  <section class="messages">
    <List
      v-if="$route.path === '/publicity/laws' && show"
      :list="list"
      :total="total"
      :headerShow="false"
      :children="children"
      :keyword.sync="keyword"
      @search="searchList"
      @update="updateList"
    />
    <NoData v-else-if="$route.path === '/publicity/laws'" label="暂无数据" />
    <router-view />
  </section>
</template>

<script>
import List from "../../../../components/list/list";
import NoData from "../../../../components/no-data";
import { knowledgeList } from "../../../../api";
import { format } from "../../../../utils/date";
export default {
  name: "publicity-laws",
  props: {},
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      children: {
        name: "publicity-law",
        idName: "id"
      },
      keyword: "",
      show: false
    };
  },
  components: {
    List,
    NoData
  },
  computed: {},
  async created() {
    await this.updateList();
    if (this.total !== 0) {
      this.show = true;
    }
  },
  methods: {
    async updateList() {
      const type = this.$route.query.type;
      const laws = await knowledgeList(this.page++, 15, type, this.keyword);
      if (laws.ret === "200") {
        laws.data.list.forEach(d => {
          d.time = format(d.updateTime);
        });
        this.list = this.list.concat(laws.data.list);
        this.total = laws.data.total;
      }
    },
    async searchList() {
      this.list = [];
      await this.updateList();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
