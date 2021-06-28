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

export { addJob, getJob, getJobs, updateJob };
