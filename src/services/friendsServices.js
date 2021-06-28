import axios from 'axios'

var endpoint = "https://api.remotebootcamp.dev/api/friends/";


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
  // pageIndex = starting with which page, pageSize = how many friends to show
  const config = {
    method: "GET",
    url: endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

let remove = (id) => {
  const config = {
    method: "DELETE",
    url: endpoint + id,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config).then(function (response) {
    return id;
  });
};

let find = (pageIndex, pageSize, searchString) => {
  const config = {
    method: "GET",
    url: endpoint + `search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${searchString}`,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config);
};
let update = (id, payload) => {
  /*expected payload format
  {
      "id": id,
      "title": "string",
      "bio": "string",
      "summary": "string",
      "headline": "string",
      "slug": "string",
      "statusId": "NotSet",
      "primaryImage": "string"
    }*/
  const config = {
    method: "PUT",
    url: endpoint + id,
    data: payload,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config);
};

let updateStatus = (id, status) => {
  const config = {
    method: "PUT",
    url: endpoint + `${id}/${status}`,
    crossdomain: true,
    headers: { "content-Type": "application/json" },
  };
  return axios(config);
};

export { add, getAll, getById, remove, find, update, updateStatus }