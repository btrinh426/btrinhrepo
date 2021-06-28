import axios from "axios";
import endpoint from "./endpointService.js";

const friendEndpoint = `${endpoint}friends`;

let add = (payload) => {
  console.log("add Friend in Ajax", payload);
  const config = {
    method: "POST",
    url: friendEndpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let paginate = (pageIndex, pageSize) => {
  console.log("paginate in Ajax");
  const config = {
    method: "GET",
    url: `${friendEndpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let selectAll = (data) => {
  console.log("SelectAll in Ajax");
  const config = {
    method: "GET",
    url: `${friendEndpoint}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let getById = (data) => {
  console.log("getById in Ajax");
  const config = {
    method: "GET",
    url: `${friendEndpoint}/${data}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let search = (pageIndex, pageSize, data) => {
  console.log("search in Ajax");
  const config = {
    method: "GET",
    url: `${friendEndpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${data}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let update = (id, payload) => {
  console.log("update Ajax");
  const config = {
    method: "PUT",
    url: `${friendEndpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let remove = (id) => {
  console.log("remove in Ajax");
  const config = {
    method: "DELETE",
    url: `${friendEndpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => id);
};

export { add, paginate, getById, selectAll, search, update, remove }; // export all your calls here

// if you had three functions to export
// export { logIn, add, thirdFunction }
