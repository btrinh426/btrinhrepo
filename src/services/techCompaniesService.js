import axios from "axios";

export let postTechCompanies = (payload) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/techcompanies",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export let getTechCompanies = (pageIndex = 0, pageSize = 10) => {
  const config = {
    method: "Get",
    url: `https://api.remotebootcamp.dev/api/techcompanies?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export let deleteTechCompany = (id) => {
  const config = {
    method: "Delete",
    url: "https://api.remotebootcamp.dev/api/techcompanies/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export let updateTechCompanies = (payload) => {
  console.log(payload);
  const config = {
    method: "Put",
    url: "https://api.remotebootcamp.dev/api/techcompanies/" + payload.id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export default {
  postTechCompanies,
  getTechCompanies,
  deleteTechCompany,
  updateTechCompanies,
};
