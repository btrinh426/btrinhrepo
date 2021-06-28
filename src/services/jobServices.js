import axios from "axios";

let addJob = (payload) => {
  console.log("jobServices.addJob is executing", payload);

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/jobs",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let updateJob = (jobId, payload) => {
  console.log("jobServices.updateJob is executing for", jobId);

  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/jobs/" + jobId,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => jobId);
};

let getAllJobsPaginated = (pageIndex, pageSize) => {
  console.log("jobServices.getAllJobs is executing", {
    pageIndex,
  });

  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/jobs" +
      "?pageIndex=" +
      pageIndex +
      "&pageSize=" +
      pageSize,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let searchJob = (pageIndex, pageSize, q) => {
  console.log("jobServices.searchJob is executing for", q);

  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/jobs/search" +
      "?pageIndex=" +
      pageIndex +
      "&pageSize=" +
      pageSize +
      "&q=" +
      q,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let deleteById = (jobId) => {
  console.log("jobsService.deleteById is executing for", { jobId });

  const config = {
    method: "DELETE",
    url: "https://api.remotebootcamp.dev/api/jobs/" + jobId,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => jobId);
};

let getById = (jobdId) => {
  console.log("jobServices.getById is executing");

  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/jobs/" + jobdId,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
export {
  addJob,
  updateJob,
  getAllJobsPaginated,
  searchJob,
  deleteById,
  getById,
};
