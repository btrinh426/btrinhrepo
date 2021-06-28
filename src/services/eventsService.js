import axios from "axios";

export let postEvents = (payload) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/events",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export let getEvents = (pageIndex, pageSize) => {
  const config = {
    method: "Get",
    url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export let deleteEvents = (id) => {
  const config = {
    method: "Delete",
    url: "https://api.remotebootcamp.dev/api/events/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export let updateEvents = (payload) => {
  console.log(payload);
  const config = {
    method: "Put",
    url: "https://api.remotebootcamp.dev/api/events/" + payload.id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default {
  postEvents,
  getEvents,
  deleteEvents,
  updateEvents,
};
