import * as dd from "dingtalk-jsapi";
import { CORPID } from "./proxy";

const dev = process.env.NODE_ENV === "development";
export const ddAuthCode = function() {
  return new Promise(resolve => {
    if (dev) {
      setTimeout(() => {
        resolve(123);
      });
    } else {
      dd.ready(function() {
        dd.runtime.permission.requestAuthCode({
          corpId: CORPID, // 企业id
          onSuccess: function(info) {
            resolve(info.code); // 通过该免登授权码可以获取用户身份
          },
          onFail: function(err) {
            alert("dd error: " + JSON.stringify(err));
          }
        });
      });
    }
  });
};
export const ddTitle = function(title) {
  if (!dev) {
    dd.biz.navigation.setTitle({
      title: title //控制标题文本，空字符串表示显示默认文本
    });
  }
};
