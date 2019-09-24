<template>
  <section class="messages">
    <List
      v-if="$route.path === '/publicity/skills' && show"
      :list="list"
      :total="total"
      :headerShow="false"
      :children="children"
      :keyword.sync="keyword"
      @search="searchList"
      @update="updateList"
    />
    <NoData v-else-if="$route.path === '/publicity/skills'" label="暂无数据" />
    <router-view />
  </section>
</template>

<script>
import List from "../../../../components/list/list";
import NoData from "../../../../components/no-data";
import { knowledgeList } from "../../../../api";
import { format } from "../../../../utils/date";
export default {
  name: "publicity-skills",
  props: {},
  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      children: {
        name: "publicity-skill",
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
      const skills = await knowledgeList(this.page++, 15, type, this.keyword);
      if (skills.ret === "200") {
        skills.data.list.forEach(d => {
          d.time = format(d.updateTime);
        });
        this.list = this.list.concat(skills.data.list);
        this.total = skills.data.total;
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
