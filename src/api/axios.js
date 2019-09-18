import axios from "axios";
// import { Toast } from "vant";
// import router from "../router";

axios.defaults.timeout = 100000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
let fileHeader = {
  headers: {
    //添加请求头
    token: window.sessionStorage.getItem("token"),
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

//HTTPrequest拦截
// const msg = "不知道谁又写出bug了，请稍后再试。如果还不行就别试了";
// axios.interceptors.request.use(
//   config => {
//     if (store.getters.token) {
//       config.headers["token"] = store.getters.token;
//     }
//     if (
//       config.method === "post" &&
//       (!config.headers["Content-Type"] ||
//         config.headers["Content-Type"].indexOf("multipart") == -1)
//     ) {
//       config.data = qs.stringify(config.data, { arrayFormat: "brackets" });
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(new Error(msg));
//   }
// );
//HTTPresponse拦截
// axios.interceptors.response.use(
//   data => {
//     if (data.data.code == "401") {
//       store.dispatch("Login").then(res => {
//         if (res.ret != "200") {
//           Toast.fail("免登失败");
//           router.push({ path: "/login" });
//         }
//       });
//     } else {
//       if (data.data.ret != "200") {
//         if (data.data.ret == "300" && data.data.msg) {
//           Toast.text(data.data.msg);
//         } else {
//           Toast.fail("请求错误");
//         }
//       }
//       return data.data;
//     }
//   },
//   error => {
//     Toast.fail("请求错误");
//     return Promise.reject(new Error(msg));
//   }
// );
