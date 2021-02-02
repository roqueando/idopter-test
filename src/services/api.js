import axios from "axios";

const api = axios.create({
  baseURL: "https://frozen-peak-68797.herokuapp.com/",
});

export default api;
