import axios from "axios";

let postJobs = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/jobs",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getJobs = (pageIndex) => {
  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/jobs?pageIndex=" +
      pageIndex +
      "&pageSize=10",
    //   data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getJobsById = (id) => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/jobs/" + id,
    //   data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let updateJobs = (payload, id) => {
  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/jobs/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let deleteJobs = (id) => {
  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/jobs/" + id + "/0",
    data: id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let searchJobs = (searchTerm) => {
  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=10&searchTerm=" +
      searchTerm,
    //   data: id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

//api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=10&searchTerm=hi

export { postJobs, updateJobs, searchJobs, getJobs, deleteJobs, getJobsById };
