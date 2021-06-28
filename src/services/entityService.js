import axios from "axios";

const entityEndpoint = "https://api.remotebootcamp.dev/api/entities/products";

const addProduct = (product) => {
  const config = {
    method: "POST",
    url: `${entityEndpoint}`,
    data: product,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addProduct };
