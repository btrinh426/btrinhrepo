import axios from "axios";

export let productService = (payload) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/entities/Products",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default { productService };
