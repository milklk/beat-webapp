import Home from "../views/home/home.vue";
import Message from "../views/message/message.vue";
import Contacts from "../views/contacts/contacts.vue";
import Publicity from "../views/publicity/publicity.vue";
import Mine from "../views/mine/mine.vue";

import HomeApproves from "../views/home/children/home-approves/home-approves.vue";
import HomeApprove from "../views/home/children/home-approves/home-approve.vue";
import HomeRecord from "../views/home/children/home-approves/home-record.vue";
import HomeHands from "../views/home/children/home-hands/home-hands.vue";
import HomeHand from "../views/home/children/home-hands/home-hand.vue";
import HomeJoins from "../views/home/children/home-joins/home-joins.vue";
import HomeJoin from "../views/home/children/home-joins/home-join.vue";
import HomeNotices from "../views/home/children/home-notices/home-notices.vue";
import HomeNotice from "../views/home/children/home-notices/home-notice.vue";

export default [
  {
    path: "/home",
    component: Home,
    meta: {
      footer: true
    },
    children: [
      {
        path: "/home/notices",
        component: HomeNotices,
        meta: { header: "公告中心" },
        children: [
          {
            path: "/home/notices/:id",
            name: "home-notice",
            component: HomeNotice,
            meta: { header: "公告详情" }
          }
        ]
      },
      {
        path: "/home/approves",
        component: HomeApproves,
        meta: { header: "审批中心" },
        children: [
          {
            path: "/home/approves/:status/:id",
            name: "home-approve",
            component: HomeApprove,
            meta: { header: "审批详情" }
          },
          {
            path: "/home/approves/:id",
            name: "home-record",
            component: HomeRecord,
            meta: { header: "审批记录" }
          }
        ]
      },
      {
        path: "/home/hands",
        component: HomeHands,
        meta: { header: "移交中心" },
        children: [
          {
            path: "/home/hands/:id",
            name: "home-hand",
            component: HomeHand,
            meta: { header: "接收人" }
          }
        ]
      },
      {
        path: "/home/joins",
        component: HomeJoins,
        meta: { header: "单位衔接" },
        children: [
          {
            path: "/home/joins/:id",
            name: "home-join",
            component: HomeJoin,
            meta: { header: "衔接人员" }
          }
        ]
      }
    ]
  },
  {
    path: "/message",
    component: Message,
    meta: {
      footer: true
    }
  },
  {
    path: "/contacts",
    component: Contacts,
    meta: {
      footer: true
    }
  },
  {
    path: "/publicity",
    component: Publicity,
    meta: {
      footer: true
    }
  },
  {
    path: "/mine",
    component: Mine,
    meta: {
      footer: true
    }
  },
  {
    path: "/",
    redirect: "/home"
  }
];
