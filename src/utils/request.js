import axios from "axios";

const request = axios.create({
  baseURL: "https://devister.onrender.com",
  // baseURL: "http://localhost:8000",

});

export default request;
