<template>
  <section class="messages">
    <List
      v-if="$route.path === '/messages' && list.length"
      :list="list"
      :unread.sync="unread"
      :total="total"
      :api="api"
      :children="children"
      :searchShow="false"
      @update="updateList"
    />
    <NoData v-else-if="$route.path === '/messages'" label="暂无消息" />
    <router-view />
  </section>
</template>

<script>
import List from "../../components/list/list";
import NoData from "../../components/no-data";
import { notifyList, notifyRead, notifyReadAll } from "../../api";
import { format } from "../../utils/date";
export default {
  name: "messages",
  props: {},
  data() {
    return {
      list: [],
      total: 0,
      unread: 0,
      page: 1,
      api: {
        readed: notifyRead,
        readAll: notifyReadAll
      },
      children: {
        name: "message",
        idName: "notifyId"
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
  watch: {
    unread() {
      this.$store.commit("messagesU/set_unread", this.unread);
    }
  },
  methods: {
    async updateList() {
      const notifies = await notifyList(this.page++, 15);
      if (notifies.ret === "200") {
        notifies.data.list.forEach(d => {
          d.time = format(d.updateTime, "yyyy-MM-dd HH:mm");
        });
        this.list = this.list.concat(notifies.data.list);
        this.total = notifies.data.total;
        this.unread = notifies.data.list[0].unread
          ? Number(notifies.data.list[0].unread)
          : 0;
        this.$store.commit("messagesU/set_unread", this.unread);
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
