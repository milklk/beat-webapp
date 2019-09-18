<template>
  <section class="messages">
    <List
      v-if="$route.path === '/publicity/skills' && list.length"
      :list="list"
      :total="total"
      :headerShow="false"
      :children="children"
      @update="updateList"
    />
    <router-view />
  </section>
</template>

<script>
import List from "../../../../components/list/list";
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
      }
    };
  },
  components: {
    List
  },
  computed: {},
  created() {
    this.updateList();
  },
  methods: {
    async updateList() {
      const type = this.$route.query.type;
      const skills = await knowledgeList(this.page++, 15, type);
      if (skills.ret === "200") {
        skills.data.list.forEach(d => {
          d.time = format(d.updateTime);
        });
        this.list = this.list.concat(skills.data.list);
        this.total = skills.data.total;
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
