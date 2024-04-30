import axios from "axios";

const apisos = axios.create({
  baseURL: "http://192.168.3.9/api/",
  // baseURL: "http://172.18.232.164/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "Application/json",
  },
});

export default apisos;