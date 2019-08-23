import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./plugins/echarts";
import "./plugins/vant";
import "./plugins/vant/vant-reset.css";
import "./plugins/reset/reset.css";
import "./plugins/better-scroll";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
