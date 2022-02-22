import axios from "axios";

const baseURL = "http://localhost:3500";

export default axios.create({
  baseURL,
});

export const axiosLogin = axios.create({
  baseURL,
  method: "post",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const refresh = axios.create({
  baseURL,
  withCredentials: true,
});
