import axios from "axios";
import { Toast  } from "vant";
import router from "../router";

axios.defaults.timeout = 100000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
const config = {
  headers: { "Content-Type": "multipart/form-data" }
};
export default function ajax(url, data = {}, type = "get", use = true) {
  response = use;
  axios.defaults.headers.common["token"] = window.sessionStorage.token;
  let promise;
  let formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] && data[key].type === "file") {
        if (data[key].files.length) {
          data[key].files.forEach(file => {
            formData.append(key, file.raw, file.name);
          });
        } else {
          formData.append(key, "");
        }
      } else {
        formData.append(key, data[key]);
      }
    }
  }
  return new Promise(function(resolve, reject) {
    if (type === "get") {
      promise = axios.get(url, { params: data });
    } else if (type === "post") {
      promise = axios.post(url, formData);
    } else if (type === "file") {
      promise = axios.post(url, formData, config);
    }
    promise
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
}

//HTTPresponse拦截
axios.interceptors.response.use(
  data => {
    if (!response) {
      response = true;
      return data;
    }
    if (!data || data.data.code == "401") {
      Toast .fail({
        title: "登陆超时",
        message: "登陆超时，请重新登录"
      });
      router.push({ path: "/login" });
      window.sessionStorage.clear();
    } else {
      if (data.data.ret != "200") {
        if (data.data.ret == "300" && data.data.msg) {
          Toast .fail({
            title: "请求异常",
            message: data.data.msg
          });
        } else if (data.data.result !== 0) {
          Toast .fail({
            title: "网络异常",
            message: "网络异常，请刷新后重试"
          });
        }
      }
      return data;
    }
  },
  error => {
    let msg = "请求错误，请刷新页面稍后再试！";
    if (error.response.status == "400") {
      msg = "400 请求出错！";
    } else if (error.response.status == "403") {
      msg = "403 禁止访问！";
    } else if (error.response.status == "404") {
      msg = "404 请求找不到资源！";
    } else if (error.response.status == "405") {
      msg = "405 不允许此方法！";
    } else if (error.response.status == "500") {
      msg = "500 服务器的内部错误！";
    } else if (error.response.status == "502") {
      msg = "502 网关出错！";
    }
    Toast .fail({
      title: "请求错误 请联系管理员",
      message: msg
    });
    // return Promise.reject(new Error(msg));
    //  return Promise.reject(error)
  }
);
