import Vue from "vue";
import echarts from "echarts/lib/echarts";

import "echarts/lib/chart/pie";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";

Vue.prototype.$echarts = echarts;
