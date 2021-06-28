import axios from "axios";

var jobService = {
  endpoint: "https://api.remotebootcamp.dev/api/jobs",
};

let getAll = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: jobService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let search = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url:
      jobService.endpoint +
      `/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => {
    //   let dataPage = response;
    let jobsResponse = response.data.item.pagedItems;
    return jobsResponse;
  });
};

let edit = (id, payload) => {
  console.log("updateJob is executing", payload);

  const config = {
    method: "PUT",
    url: jobService.endpoint + `/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let add = (payload) => {
  const config = {
    method: "POST",
    url: jobService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((response) => {
    let newJob = payload;
    newJob.id = response.data.item;
    return newJob;
  });
};

export { getAll, search, edit, add }; // export all your calls here
