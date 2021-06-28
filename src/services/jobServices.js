import axios from "axios";

const userEndpoint = "https://api.remotebootcamp.dev/api/jobs";

const addJob = (job) => {
  const config = {
    method: "POST",
    url: userEndpoint,
    data: job,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getJob = (id) => {
  const config = {
    method: "GET",
    url: `${userEndpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
}

// https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=20
const getJobs = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${userEndpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
}

const searchJobs = (pageIndex, pageSize, searchString) => {
  const config = {
    method: "GET",
    url: `${userEndpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchString}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
}

const updateJob = (job) => {
  const config = {
    method: "PUT",
    url: `${userEndpoint}/${job.id}`,
    data: job,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
}

// https://api.remotebootcamp.dev/api/jobs/24397/2
// in API, statusId of 2 -> Delete
const deleteJob = (id) => {
  const config = {
    method: "PUT",
    url: `${userEndpoint}/${id}/2`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
}

export { addJob, getJob, getJobs, updateJob, searchJobs, deleteJob };
