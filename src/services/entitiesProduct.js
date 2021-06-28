import axios from "axios";

let newProduct = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/Baseballs",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { newProduct };
