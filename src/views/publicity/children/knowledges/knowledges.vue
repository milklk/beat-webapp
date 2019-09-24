<template>
  <section class="messages">
    <!-- eslint-disable-next-line -->
    <List
      v-if="$route.path === '/publicity/knowledges' && show"
      :list="list"
      :total="total"
      :headerShow="false"
      :children="children"
      @update="updateList"
      @search="searchList"
      :keyword.sync="keyword"
    />
    <!-- eslint-disable-next-line -->
    <NoData v-else-if="$route.path === '/publicity/knowledges'" label="暂无知识" />
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
      keyword: "",
      list: [],
      total: 0,
      page: 1,
      children: {
        name: "publicity-knowledge",
        idName: "id"
      },
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
      const knowledges = await knowledgeList(
        this.page++,
        15,
        type,
        this.keyword
      );
      if (knowledges.ret === "200") {
        knowledges.data.list.forEach(d => {
          d.time = format(d.updateTime);
        });
        this.list = this.list.concat(knowledges.data.list);
        this.total = knowledges.data.total;
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
