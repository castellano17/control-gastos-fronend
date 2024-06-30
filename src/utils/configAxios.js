import axios from "axios";

export const axiosEcommerce = axios.create({
  baseURL: "https://control-gastos-ftbn.onrender.com/api/v1",
});

export const getConfig = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userInfo"))?.token
      }`,
    },
  };
  return config;
};
