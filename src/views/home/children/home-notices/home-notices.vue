<template>
  <section class="home-notices">
    <List
      v-if="$route.path === '/home/notices' && list.length"
      :list="list"
      :unread.sync="unread"
      :total="total"
      :api="api"
      :children="children"
      @update="updateList"
    />
    <NoData v-else-if="$route.path === '/home/notices'" label="暂无公告" />
    <router-view />
  </section>
</template>

<script>
import List from "../../../../components/list/list";
import NoData from "../../../../components/no-data";
import { noticesList, noticesRead, noticesReadAll } from "../../../../api";
import { format } from "../../../../utils/date";
export default {
  name: "home-notices",
  props: {},
  data() {
    return {
      list: [],
      total: 0,
      unread: 0,
      page: 1,
      api: {
        readed: noticesRead,
        readAll: noticesReadAll
      },
      children: {
        name: "home-notice",
        idName: "noticeId"
      }
    };
  },
  components: {
    List,
    NoData
  },
  computed: {},
  created() {
    if (this.$route.path === "/home/notices") {
      this.updateList();
    }
  },
  methods: {
    async updateList() {
      const notices = await noticesList(this.page++, 15);
      if (notices.ret === "200") {
        notices.data.list.forEach(d => {
          d.time = format(d.updateTime);
        });
        this.list = notices.data.list;
        this.total = notices.data.total;
        this.unread = notices.data.list[0].unread
          ? Number(notices.data.list[0].unread)
          : 0;
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
