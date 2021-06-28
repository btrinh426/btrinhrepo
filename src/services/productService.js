import axios from "axios";

var productService = {
  enpoint: "https://api.remotebootcamp.dev/api/entities/Products",
};

const addProduct = (payload) => {
  const config = {
    method: "POST",
    url: productService.endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    let newProduct = payload;
    newProduct.id = response.data.item;
    return newProduct;
  });
};

export { addProduct };
