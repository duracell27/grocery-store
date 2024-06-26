

const { default: axios } = require("axios");

const axiosConfig = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategory = () => axiosConfig.get("/categories?populate=*");

const getSliders = () =>
  axiosConfig.get("/sliders?populate=*").then((response) => response.data.data);

const getCategoryList = () =>
  axiosConfig
    .get("/categories?populate=*")
    .then((response) => response.data.data);

const getAllProducts = () =>
  axiosConfig
    .get("/products?populate=*")
    .then((response) => response.data.data);

const getProductsByCategory = (category) =>
  axiosConfig
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((response) => response.data.data);

const registerUser = (username, email, password) =>
  axiosConfig.post("/auth/local/register", { username, email, password });

const signIn = (email, password) =>
  axiosConfig.post("/auth/local", { identifier: email, password });

const addToCart = (data, jwt) =>
  axiosConfig.post("/user-carts", data, {
    headers: {
      // "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userId, jwt) =>
  axiosConfig
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemList = data.map((item, index) => ({
        name: item.attributes.products?.data[0].attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          item.attributes.products?.data[0].attributes.images?.data[0]
            .attributes.url,
        id: item.id,
        price: item.attributes.products?.data[0].attributes.mrp,
        product: item.attributes.products?.data[0].id,
      }));

      return cartItemList;
    });

const deleteCartItem = (id, jwt) =>
  axiosConfig.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const createOrder = (data, jwt) =>
  axiosConfig.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getOrders = (userId, jwt) =>
  axiosConfig
    .get(
      "/orders?filters[userId][$eq]=2&populate[orderItemList][populate][product][populate][images]=url",
      { headers: { Authorization: "Bearer " + jwt } }
    )
    .then((resp) => {
      const response = resp.data.data
      const orderList = response.map((item) =>({
          id: item.id,
          totalOrderAmount: item.attributes.totalOrderAmount,
          paymentId: item.attributes.paymentId,
          orderItemList: item.attributes.orderItemList,
          createdAt: item.attributes.createdAt
      }))
      return orderList
    });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signIn,
  addToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
  getOrders
};
