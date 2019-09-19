import axios from "axios";
import { Toast } from "vant";
import router from "../router";

axios.defaults.timeout = 100000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
let fileHeader = {
  headers: {
    //添加请求头
    "Content-Type": "multipart/form-data"
  }
};
export default function ajax(url, data = {}, type = "get") {
  axios.defaults.headers.common["token"] = window.sessionStorage.getItem(
    "token"
  );
  let promise;
  let formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return new Promise(function(resolve, reject) {
    if (type === "get") {
      promise = axios.get(url, { params: data });
    } else if (type === "post") {
      promise = axios.post(url, formData);
    } else if (type === "file") {
      promise = axios.post(url, formData, fileHeader);
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

// HTTPresponse拦截;
axios.interceptors.response.use(
  data => {
    if (!data || data.data.code == "401") {
      Toast.fail("登陆超时");
      window.sessionStorage.clear();
      router.push({ path: "/" });
    } else {
      if (data.data.ret != "200") {
        if (data.data.ret == "300" && data.data.msg) {
          Toast.fail(data.data.msg);
        } else if (data.data.result !== 0) {
          Toast.fail("网络异常，请刷新后重试");
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
    Toast.fail(msg);
  }
);
