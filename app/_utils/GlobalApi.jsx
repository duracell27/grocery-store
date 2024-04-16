const { default: axios } = require("axios");

const axiosConfig = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategory = () => axiosConfig.get("/categories?populate=*");

export default { getCategory };
