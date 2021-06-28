import axios from "axios";

const allJobs = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=10",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const jobSearch = (query) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=9&searchTerm=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { jobSearch, allJobs };
