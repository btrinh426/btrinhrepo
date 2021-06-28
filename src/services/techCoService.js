import axios from "axios";

const techCoService = {
    endpoint: "https://api.remotebootcamp.dev/api/techcompanies"
};

let add = (payload) =>
{
    const config = {
        method: "POST",
        url: techCoService.endpoint,
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
        url: techCoService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
}

export { add, getByPage };