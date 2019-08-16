import Home from "../views/home/home.vue";
import Message from "../views/message/message.vue";
import Contacts from "../views/contacts/contacts.vue";
import Publicity from "../views/publicity/publicity.vue";
import Mine from "../views/mine/mine.vue";

export default [
  {
    path: "/home",
    component: Home,
    meta: {
      footer: true
    }
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
