import axios from "axios";

let endpoint = "https://localhost:50001/api/friends";
let add = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let getAll = (index, size) => {
  const config = {
    method: "GET",
    url: endpoint + `/paginate?pageIndex=${index}&pageSize=${size}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let getById = (id) => {
  const config = {
    method: "GET",
    url: endpoint + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let update = (id, payload) => {
  const config = {
    method: "PUT",
    url: endpoint + "/" + id,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
let remove = (id) => {
  const config = {
    method: "DELETE",
    url: endpoint + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    return id;
  });
};
let getByName = (index, size, queryString) => {
  const config = {
    method: "GET",
    url:
      endpoint +
      `/search?pageIndex=${index}&pageSize=${size}&query=${queryString}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { add, getAll, getById, update, remove, getByName };
