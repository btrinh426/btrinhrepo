import axios from "axios";

let userEndpoint = {
  endpoint: "https://api.remotebootcamp.dev/api/entities/",
};

// POST
let addEntity = (payload) => {
  const config = {
    method: "POST",
    url: `${userEndpoint.endpoint}cars`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default { addEntity };
