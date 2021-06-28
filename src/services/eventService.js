import axios from "axios";

const sabioEndpoint = "https://api.remotebootcamp.dev/api/events";

let add = (payload) => {
  const config = {
    method: "POST",
    url: sabioEndpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getAll = () => {
  const config = {
    method: "GET",
    url: sabioEndpoint + `/feeds`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { add, getAll };
