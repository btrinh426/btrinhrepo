import axios from "axios";

const productService = {
  addEntity: "https://api.remotebootcamp.dev/api/entities/products",
};

let addProduct = (payload) => {
  const config = {
    method: "POST",
    url: productService.addEntity,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addProduct };
