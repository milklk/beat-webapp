//vant-ui引入以及按需加载
//官方网址：https://youzan.github.io/vant/#/zh-CN/intro
import Vue from "vue";

import { Button } from "vant";
import { Tabbar, TabbarItem } from "vant";
import { NavBar } from "vant";
import { Icon } from "vant";
import { Image } from "vant";
import { Grid, GridItem } from "vant";
import { NoticeBar } from "vant";
import { Tag } from "vant";
import { Divider } from "vant";
import { Cell, CellGroup } from "vant";
import { ActionSheet } from "vant";
import { Toast } from "vant";
import { List } from "vant";
import { Switch } from "vant";
import { Dialog } from "vant";
import { Overlay } from "vant";
import { Loading } from "vant";
import { Field } from "vant";
import { Tab, Tabs } from "vant";
import { Search } from "vant";
import { Step, Steps } from "vant";
import { Checkbox, CheckboxGroup } from "vant";

Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Step).use(Steps);
Vue.use(Search);
Vue.use(Tab).use(Tabs);
Vue.use(Field);
Vue.use(Loading);
Vue.use(Overlay);
Vue.use(Dialog);
Vue.use(Switch);
Vue.use(List);
Vue.use(Toast);
Vue.use(ActionSheet);
Vue.use(Cell).use(CellGroup);
Vue.use(Divider);
Vue.use(Tag);
Vue.use(NoticeBar);
Vue.use(Grid).use(GridItem);
Vue.use(Image);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Button);
