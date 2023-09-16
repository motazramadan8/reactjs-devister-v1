import axios from "axios";

const request = axios.create({
  baseURL: "https://devister.onrender.com",
});

export default request;
