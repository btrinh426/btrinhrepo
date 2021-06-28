import axios from "axios";

var friendService = {
  endpoint: "https://api.remotebootcamp.dev/api/friends",
};

const create = (payload) => {
  const config = {
    method: "POST",
    url: friendService.endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const read = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${friendService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const update = (payload) => {
  const config = {
    method: "PUT",
    url: friendService.endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const search = (pageIndex, pageSize, keyWord) => {
  const config = {
    method: "GET",
    url: `${friendService.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${keyWord}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const deleteById = (id) => {
  const config = {
    method: "DELETE",
    url: friendService.endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => id);
};

export { create, read, update, search, deleteById };
