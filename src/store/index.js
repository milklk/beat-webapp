import Vue from "vue";
import Vuex from "vuex";

import messagesU from "./modules/messages-u";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    messagesU
  }
});
