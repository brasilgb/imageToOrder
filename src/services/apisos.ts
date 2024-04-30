import axios from "axios";

const apisos = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_IP}/api/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "Application/json",
  },
});

export default apisos;