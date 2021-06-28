import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/friends";

let getAll = () => {
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=0&pageSize=12`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let addOne = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let upDate = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let deleteFriend = (Id) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/${Id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    return Id;
  });
};

export { getAll, addOne, upDate, deleteFriend };
