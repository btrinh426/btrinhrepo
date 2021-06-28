import axios from "axios";

var jobService = {
  endpoint: `https://api.remotebootcamp.dev/api/jobs`,
};

let pageOfJobs = (index = "0", pageSize = "10") => {
  const config = {
    method: "GET",
    url: `${jobService.endpoint}?pageIndex=${index}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let addJob = (payload) => {
  const config = {
    method: "POST",
    url: jobService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let updateJob = (payload, id) => {
  console.log("this is the payload", payload);
  const config = {
    method: "PUT",
    url: `${jobService.endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let searchJob = (searchInfo, page = 0, pageSize = 3) => {
  const config = {
    method: "GET",
    url: `${jobService.endpoint}/search?pageIndex=${page}&pageSize=${pageSize}&searchTerm=${searchInfo}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { pageOfJobs, addJob, updateJob, searchJob };
