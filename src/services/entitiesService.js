import axios from "axios";

const entitiesService = {
  endpoint: "https://api.remotebootcamp.dev/api/entities/products",
};

export const create = (newProduct) => {
  const config = {
    method: "POST",
    url: entitiesService.endpoint,
    data: newProduct,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
