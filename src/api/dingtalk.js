import * as dd from "dingtalk-jsapi";
import { CORPID } from "./proxy";

export const ddAuthCode = function() {
  return new Promise(resolve => {
    // setTimeout(() => {
    //   resolve(123);
    // });
    dd.ready(function() {
      dd.runtime.permission.requestAuthCode({
        corpId: CORPID, // 企业id
        onSuccess: function(info) {
          resolve(info.code); // 通过该免登授权码可以获取用户身份
        }
      });
    });
  });
};
