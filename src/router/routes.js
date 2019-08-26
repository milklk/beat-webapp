import Home from "../views/home/home.vue";
import Messages from "../views/messages/messages.vue";
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
import Message from "../views/messages/message.vue";
import PublicityLaws from "../views/publicity/children/laws/laws.vue";
import PublicityLaw from "../views/publicity/children/laws/law.vue";
import PublicityKnowledges from "../views/publicity/children/knowledges/knowledges.vue";
import PublicityKnowledge from "../views/publicity/children/knowledges/knowledge.vue";
import PublicitySkills from "../views/publicity/children/skills/skills.vue";
import PublicitySkill from "../views/publicity/children/skills/skill.vue";

//设置router路由
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
            path: "/home/hands/hand",
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
    path: "/messages",
    component: Messages,
    meta: {
      footer: true,
      header: "消息中心"
    },
    children: [
      {
        path: "/messages/:id",
        name: "message",
        component: Message,
        meta: {
          header: "消息详情"
        }
      }
    ]
  },
  {
    path: "/contacts",
    component: Contacts,
    meta: {
      footer: true,
      header: "通讯录"
    }
  },
  {
    path: "/publicity",
    component: Publicity,
    meta: {
      footer: true,
      header: "宣传中心"
    },
    children: [
      {
        path: "/publicity/laws",
        component: PublicityLaws,
        meta: {
          footer: true,
          header: "法律法规"
        },
        children: [
          {
            path: "/publicity/laws/:id",
            component: PublicityLaw,
            name: "publicity-law",
            meta: {
              header: "法律法规"
            }
          }
        ]
      },
      {
        path: "/publicity/Knowledges",
        component: PublicityKnowledges,
        meta: {
          footer: true,
          header: "禁毒知识"
        },
        children: [
          {
            path: "/publicity/Knowledges/:id",
            name: "publicity-knowledge",
            component: PublicityKnowledge,
            meta: {
              header: "禁毒知识"
            }
          }
        ]
      },
      {
        path: "/publicity/skills",
        component: PublicitySkills,
        meta: {
          footer: true,
          header: "工作技巧"
        },
        children: [
          {
            path: "/publicity/skills/:id",
            component: PublicitySkill,
            name: "publicity-skill",
            meta: {
              header: "工作技巧"
            }
          }
        ]
      }
    ]
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
