import axios from "axios";

let add = (payload) => {

    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/friends",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
};

let getByPage = (pageIndex, pageSize) => {

    const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
};

let deleteFriend = (id) => {

  const config = {
    method: "DELETE",
    url: `https://api.remotebootcamp.dev/api/friends/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(() => id);
};

let getById = (id) => {

  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/friends/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let update = (id, payload) => {

  const config = {
    method: "PUT",
    url: `https://api.remotebootcamp.dev/api/friends/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export { add, getByPage, deleteFriend, getById, update }