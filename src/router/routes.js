import Home from "../views/home/home.vue";
import Messages from "../views/messages/messages.vue";
import Contacts from "../views/contacts/contacts.vue";
import Publicity from "../views/publicity/publicity.vue";
import Mine from "../views/mine/mine.vue";
import Login from "../views/login/login.vue";

import HomeApproves from "../views/home/children/home-approves/home-approves.vue";
import HomeApprove from "../views/home/children/home-approves/home-approve.vue";
import HomeRecord from "../views/home/children/home-approves/home-record.vue";
import HomeHands from "../views/home/children/home-hands/home-hands.vue";
import HomeHand from "../views/home/children/home-hands/home-hand.vue";
import HomeJoins from "../views/home/children/home-joins/home-joins.vue";
import HomeJoin from "../views/home/children/home-joins/home-join.vue";
import HomeSends from "../views/home/children/home-sends/home-sends.vue";
import HomeSend from "../views/home/children/home-sends/home-send.vue";
import HomeNotices from "../views/home/children/home-notices/home-notices.vue";
import HomeNotice from "../views/home/children/home-notices/home-notice.vue";
import Message from "../views/messages/message.vue";
import PublicityLaws from "../views/publicity/children/laws/laws.vue";
import PublicityLaw from "../views/publicity/children/laws/law.vue";
import PublicityKnowledges from "../views/publicity/children/knowledges/knowledges.vue";
import PublicityKnowledge from "../views/publicity/children/knowledges/knowledge.vue";
import PublicitySkills from "../views/publicity/children/skills/skills.vue";
import PublicitySkill from "../views/publicity/children/skills/skill.vue";
import Contact from "../views/contacts/contact.vue";
import ContactRecord from "../views/contacts/children/contact-record.vue";
import ContactSignIn from "../views/contacts/children/contact-sign-in.vue";
import ContactUrinalysis from "../views/contacts/children/contact-urinalysis.vue";
import ContactTalk from "../views/contacts/children/contact-talk.vue";
import ContactVisit from "../views/contacts/children/contact-visit.vue";
import ContactLeave from "../views/contacts/children/contact-leave.vue";
import ContactAssess from "../views/contacts/children/contact-assess.vue";
import ContactHelping from "../views/contacts/children/contact-helping.vue";
import ContactAgreement from "../views/contacts/children/contact-agreement.vue";
import ContactFind from "../views/contacts/children/contact-find.vue";
import ContactParty from "../views/contacts/children/contact-party.vue";
import ContactDrugs from "../views/contacts/children/contact-drugs.vue";
import MineAbout from "../views/mine/children/mine-about.vue";
import MineDatum from "../views/mine/children/mine-datum.vue";

//设置router路由
export default [
  {
    path: "/home",
    component: Home,
    meta: {
      footer: true,
      header: "社戒社康中心"
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
      },
      {
        path: "/home/sends",
        component: HomeSends,
        meta: { header: "接收中心" },
        children: [
          {
            path: "/home/sends/:id",
            name: "home-send",
            component: HomeSend,
            meta: { header: "接收人员" }
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
    },
    children: [
      {
        path: "/contacts/contact/:id",
        name: "contact",
        component: Contact,
        meta: { header: "人员详情" }
      },
      {
        path: "/contacts/record/:id/:header",
        name: "contact-record",
        component: ContactRecord,
        meta: { header: true }
      },
      {
        path: "/contacts/sign-in/:id",
        name: "contact-sign-in",
        component: ContactSignIn,
        meta: { header: `签到` }
      },
      {
        path: "/contacts/urinalysis/:id",
        name: "contact-urinalysis",
        component: ContactUrinalysis,
        meta: { header: `尿检` }
      },
      {
        path: "/contacts/talk/:id",
        name: "contact-talk",
        component: ContactTalk,
        meta: { header: `谈话` }
      },
      {
        path: "/contacts/visit/:id",
        name: "contact-visit",
        component: ContactVisit,
        meta: { header: `拜访` }
      },
      {
        path: "/contacts/leave/:id",
        name: "contact-leave",
        component: ContactLeave,
        meta: { header: `请假` }
      },
      {
        path: "/contacts/assess/:id",
        name: "contact-assess",
        component: ContactAssess,
        meta: { header: `评估` }
      },
      {
        path: "/contacts/helping/:id",
        name: "contact-helping",
        component: ContactHelping,
        meta: { header: `帮扶救助` }
      },
      {
        path: "/contacts/agreement/:id",
        name: "contact-agreement",
        component: ContactAgreement,
        meta: { header: `告诫信息` }
      },
      {
        path: "/contacts/find/:id",
        name: "contact-find",
        component: ContactFind,
        meta: { header: `查找脱失` }
      },
      {
        path: "/contacts/drugs/:id",
        name: "contact-drugs",
        component: ContactDrugs,
        meta: { header: `药物维持` }
      },
      {
        path: "/contacts/party/:id",
        name: "contact-party",
        component: ContactParty,
        meta: { header: `工作小组` }
      }
    ]
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
      footer: true,
      header: "个人中心"
    },
    children: [
      {
        path: "/mine/about",
        component: MineAbout,
        meta: {
          header: "关于"
        }
      },
      {
        path: "/mine/datum",
        component: MineDatum,
        meta: {
          header: "修改资料"
        }
      }
      // {
      //   path: "/mine/report",
      //   component: MineReport,
      //   meta: {
      //     header: "一键举报"
      //   }
      // }
    ]
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/",
    redirect: "/home"
  }
];
