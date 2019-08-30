import Vue from "vue";

const u = navigator.userAgent;
const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
const userAgent = isAndroid ? "android" : isiOS ? "ios" : "";

Vue.prototype.$userAgent = userAgent;
