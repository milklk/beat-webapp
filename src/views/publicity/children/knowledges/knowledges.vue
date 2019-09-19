<template>
  <section class="messages">
    <!-- eslint-disable-next-line -->
    <List
      v-if="$route.path === '/publicity/knowledges' && list.length"
      :list="list"
      :total="total"
      :headerShow="false"
      :children="children"
      @update="updateList"
    />
    <!-- eslint-disable-next-line -->
    <NoData v-else-if="$route.path === '/publicity/knowledges'" label="暂无数据" />
    <router-view />
  </section>
</template>

<script>
import List from "../../../../components/list/list";
import NoData from "../../../../components/no-data";
import { knowledgeList } from "../../../../api";
import { format } from "../../../../utils/date";
export default {
  name: "publicity-knowledges",
  props: {},
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      children: {
        name: "publicity-knowledge",
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
      const knowledges = await knowledgeList(this.page++, 15, type);
      if (knowledges.ret === "200") {
        knowledges.data.list.forEach(d => {
          d.time = format(d.updateTime);
        });
        this.list = this.list.concat(knowledges.data.list);
        this.total = knowledges.data.total;
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
