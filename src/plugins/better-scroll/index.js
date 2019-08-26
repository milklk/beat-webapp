//better-scroll引入以及插件加载
// 官方网址：https://better-scroll.github.io/docs/zh-CN/
import Vue from "vue";
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);

Vue.prototype.$BScroll = BScroll;
