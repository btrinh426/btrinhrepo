import axios from "axios";

var jobService = {
    endpoint: "https://api.remotebootcamp.dev/api/jobs"
};

let add = (payload) =>
{
    const config = {
        method: "POST",
        url: jobService.endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
}

let getByPage = (pageIndex, pageSize) =>
{
    const config = {
        method: "GET",
        url: jobService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
}

let getById = (id) =>
{
    const config = {
        method: "GET",
        url: jobService.endpoint + `/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
}

let update = (id, payload) =>
{
    const config = {
        method: "PUT",
        url: jobService.endpoint + `/${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
}

let deleteJob = (id) =>
{
    const config = {
        method: "PUT",
        url: jobService.endpoint + `/${id}/2`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config)
      .then(() => id);
}

export { add, getByPage, getById, update, deleteJob };