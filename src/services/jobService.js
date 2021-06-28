import axios from "axios";

const jobEndpoint = "https://api.remotebootcamp.dev/api/jobs";

const addJob = (job) => {
  // {
  //   "title": "string",
  //   "description": "string",
  //   "summary": "string",
  //   "pay": "string",
  //   "slug": "string",
  //   "statusId": "NotSet",
  //   "techCompanyId": 0,
  //   "skills": [
  //     "string"
  //   ]
  // }

  const config = {
    method: "POST",
    url: `${jobEndpoint}`,
    data: job,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const updateJob = (job) => {
  // {
  //   "id": 0,
  //   "title": "string",
  //   "description": "string",
  //   "summary": "string",
  //   "pay": "string",
  //   "slug": "string",
  //   "statusId": "NotSet",
  //   "techCompanyId": 0,
  //   "skills": [
  //     "string"
  //   ]
  // }

  const config = {
    method: "PUT",
    url: `${jobEndpoint}/${job.id}`,
    data: job,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getJobs = (pageIndex, pageSize) => {
  let targetUrl = `${jobEndpoint}/?pageIndex=${pageIndex}&pageSize=${pageSize}`;

  const config = {
    method: "GET",
    url: targetUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getJobById = (jobId) => {
  let targetUrl = `${jobEndpoint}/${jobId}`;
  const config = {
    method: "GET",
    url: targetUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getJobBySlug = (jobSlug) => {
  let targetUrl = `${jobEndpoint}/${jobSlug}`;
  const config = {
    method: "GET",
    url: targetUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const searchJobs = (searchCriteria, pageIndex, pageSize) => {
  let targetUrl = `${jobEndpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&q=${searchCriteria}`;
  const config = {
    method: "GET",
    url: targetUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const updateJobStatus = (job) => {
  // {
  //   "id": 0,
  //   "title": "string",
  //   "description": "string",
  //   "summary": "string",
  //   "pay": "string",
  //   "slug": "string",
  //   "statusId": "NotSet",
  //   "techCompanyId": 0,
  //   "skills": [
  //     "string"
  //   ]
  // }

  const config = {
    method: "PUT",
    url: `${jobEndpoint}/${job.id}/${job.statusId}`,
    data: job,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { jobEndpoint, addJob, updateJob, getJobs, getJobById, getJobBySlug, searchJobs, updateJobStatus };
