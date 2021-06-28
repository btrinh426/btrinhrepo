import axios from "axios";

let addProduct = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/products",
    data: payload,
  };
  return axios(config);
};

export { addProduct };
