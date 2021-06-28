import axios from "axios";

const friendService = {
  endpoint: "https://api.remotebootcamp.dev/api/friends"
};

let add = (payload) => {

    const config = {
      method: "POST",
      url: friendService.endpoint,
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
      url: friendService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
};

let deleteFriend = (id) => {

  const config = {
    method: "DELETE",
    url: friendService.endpoint + `/${id}`,
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
    url: friendService.endpoint + `/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let update = (id, payload) => {

  const config = {
    method: "PUT",
    url: friendService.endpoint + `/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

let search = (pageIndex, pageSize, searchQuery) => {

  const config = {
    method: "GET",
    url: friendService.endpoint + `/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${searchQuery}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export { add, getByPage, deleteFriend, getById, update, search };