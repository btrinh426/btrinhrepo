import axios from "axios";

export let postHouses = (payload) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/entities/houses",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export let getHouses = () => {
  const config = {
    method: "Get",
    url: "https://api.remotebootcamp.dev/api/entities/houses/",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export let deleteHouses = (id) => {
  const config = {
    method: "Delete",
    url: "https://api.remotebootcamp.dev/api/entities/houses/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => id);
};
export let updateHouses = (payload) => {
  console.log(payload);
  const config = {
    method: "Put",
    url: "https://api.remotebootcamp.dev/api/entities/houses/" + payload.id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default {
  postHouses,
  getHouses,
  deleteHouses,
  updateHouses,
};
