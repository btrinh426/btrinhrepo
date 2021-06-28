import axios from "axios"

let addJob = (payload) => {
    console.log("Successfully called ajax addJob with info: ", payload);
  
    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/jobs",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let editJob = (payload, id) => {
    console.log("Successfully called ajax editJob with info: ", id);
  
    const config = {
      method: "PUT",
      url: "https://api.remotebootcamp.dev/api/jobs/" + id,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let getJobs = (pageIndex, pageSize) => {
    console.log("Successfully called ajax getJobs");
  
    const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/jobs?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let searchJobs = (query, pageIndex, pageSize) => {
    console.log("Successfully called search getJobs with query: ", query);
  
    const config = {
      method: "GET",
      url: `https://api.remotebootcamp.dev/api/jobs/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${query}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let deleteJob = (id) => {
    console.log("Successfully called ajax deleteJob with id: ", id);
  
    const config = {
      method: "PUT",
      url: "https://api.remotebootcamp.dev/api/jobs/" + id + "/0",
      data: id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

export {addJob, editJob, getJobs, searchJobs, deleteJob};