import axios from "axios";

let jobService = {
  endpoint: "https://api.remotebootcamp.dev/api/jobs",
};

let addJob = (payload) => {
  const config = {
    method: "POST",
    url: jobService.endpoint,
    data: payload,
  };
  return axios(config);
};

let updateJob = (payload) => {
  const config = {
    method: "PUT",
    data: payload,
    url: `${jobService.endpoint}/${payload.id}`,
  };
  return axios(config);
};

let getJobs = (page) => {
  const config = {
    method: "GET",
    url: `${jobService.endpoint}/?pageIndex=${page}&pageSize=10`,
  };
  return axios(config);
};

export { addJob, updateJob, getJobs };
