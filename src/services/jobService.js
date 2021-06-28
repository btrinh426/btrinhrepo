import axios from "axios";

var jobService = {
  endpoint: "https://api.remotebootcamp.dev/api/jobs",
};

// ----- Add New Job -----
let add = (newJob) => {
  const config = {
    method: "POST",
    url: jobService.endpoint,
    data: newJob,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(function (response) {
    console.log("Add Job", response);
    newJob.id = response.data.item;
    return newJob;
  });
};

// ----- Edit Job -----
let editById = (payload, id) => {
  const config = {
    method: "PUT",
    url: jobService.endpoint + "/" + id,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(function (response) {
    console.log("Edit Job", response);
    payload.id = id;
    return payload;
  });
};

// ----- Get Job List -----
let jobList = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: jobService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(function (data) {
    console.log({ jobServiceData: data });
    return data;
  });
};

// ----- Search for a Job -----
let search = (pageIndex, pageSize, searchResult) => {
  const config = {
    method: "GET",
    url:
      jobService.endpoint +
      `/search?pageIndex=${pageIndex}&pageSize=${pageSize}` +
      "&searchTerm=" +
      searchResult,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (data) {
      console.warn(data);
    });
};

export { add, editById, jobList, search };
