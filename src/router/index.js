import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import { ddAuthCode } from "../api/dingtalk";
import { login } from "../api";
Vue.use(Router);
const base =
  process.env.NODE_ENV === "development" ? process.env.BASE_URL : "/bsapp/";
const router = new Router({
  mode: "history",
  base: base,
  routes
});
export default router;

//跳转报错解决
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
// 路由守卫;
router.beforeEach(async (to, from, next) => {
  if (window.sessionStorage.getItem("token")) {
    next();
  } else {
    const authCode = await ddAuthCode();
    const user = await login(authCode);
    if (user.ret === "200") {
      window.sessionStorage.setItem("token", user.data.token);
      next();
    }
  }
});
