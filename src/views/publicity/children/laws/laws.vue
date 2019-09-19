<template>
  <section class="messages">
    <List
      v-if="$route.path === '/publicity/laws' && list.length"
      :list="list"
      :total="total"
      :headerShow="false"
      :children="children"
      @update="updateList"
    />
   <NoData v-else label="暂无数据" />
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
      }
    };
  },
  components: {
    List,
    NoData
  },
  computed: {},
  created() {
    this.updateList();
  },
  methods: {
    async updateList() {
      const type = this.$route.query.type;
      const laws = await knowledgeList(this.page++, 15, type);
      if (laws.ret === "200") {
        laws.data.list.forEach(d => {
          d.time = format(d.updateTime);
        });
        this.list = this.list.concat(laws.data.list);
        this.total = laws.data.total;
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
