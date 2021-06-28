import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/friends";

let add = (payload) => {
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

let getAll = (index, size) => {
  const config = {
    method: "GET",
    url: endpoint + `?pageIndex=${index}&pageSize=${size}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let updateById = (id, payload) => {
  const config = {
    method: "PUT",
    url: endpoint + "/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getById = (id) => {
  const config = {
    method: "GET",
    url: endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let deleteById = (id) => {
  const config = {
    method: "DELETE",
    url: endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let search = (index, size, inputText) => {
  const config = {
    method: "GET",
    url: endpoint + `/search?pageIndex=${index}&pageSize=${size}&q=${inputText}`,
    withCredentials: true,
    crossdomain: true,  //https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=3&q=Michael
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
};

let updateStatus = (id, statusId) => {
  const config = {
    method: "PUT",
    url: endpoint + "/" + id + statusId,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getBySlug = (slug) => {
  const config = {
    method: "GET",
    url: endpoint + "/" + slug,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export {
  add,
  getAll,
  updateById,
  getById,
  deleteById,
  search,
  updateStatus,
  getBySlug,
};
