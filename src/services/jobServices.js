import axios from 'axios'

var endpoint = "https://api.remotebootcamp.dev/api/jobs/";

let add = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config);
};

let getAll = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config);
};

let update = (id, payload) => {
  const config = {
    method: "PUT",
    url: endpoint + id,
    data: payload,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config);
};

let getById = (id) => {
  const config = {
    method: "GET",
    url: endpoint + id,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config);
};

let find = (searchString) => {
  const config = {
    method: "GET",
    url: endpoint + `search?pageIndex=0&pageSize=10&searchTerm=${searchString}`,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config);
};

let updateStatus = (id, statusId) => {
  const config = {
    method: "PUT",
    url: endpoint + id + `/${statusId}`,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config).then(function (response) {
    return id;
  });
};

export { add, getAll, update, find, updateStatus, getById }