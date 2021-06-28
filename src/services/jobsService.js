import axios from "axios";

export let postJobs = (payload) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/jobs",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export let getJobs = () => {
  const config = {
    method: "Get",
    url: "https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=10",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export let deleteJobs = (id, statusId) => {
  const config = {
    method: "Put",
    url: "https://api.remotebootcamp.dev/api/jobs/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => id);
};
export let updateJobs = (payload) => {
  console.log(payload);
  const config = {
    method: "Put",
    url: "https://api.remotebootcamp.dev/api/jobs/" + payload.id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default {
  postJobs,
  getJobs,
  deleteJobs,
  updateJobs,
};
