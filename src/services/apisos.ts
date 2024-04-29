import axios from "axios";

const apisos = axios.create({
  baseURL: "http://172.16.1.67:8080/api/",
  // baseURL: "http://172.18.232.164/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "Application/json",
  },
});

export default apisos;