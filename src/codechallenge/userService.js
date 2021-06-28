import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/entities/items";

export let addItem = (payload) => {

  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};
