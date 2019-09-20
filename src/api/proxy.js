export const api =
  process.env.NODE_ENV === "development"
    ? "/bs/app"
    : "http://120.24.153.253:8080/bs/app";
export const fileApi =
  process.env.NODE_ENV === "development"
    ? "/bs"
    : "http://120.24.153.253:8080/bs";
export const CORPID = "ding0b2eb47d0e7bf89135c2f4657eb6378f";
