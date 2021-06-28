import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/techcompanies"

let addCompany = (payload, onSuccess, onError) => {

    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let getCompanies = (pageIndex, pageSize) => {

    const config = {
      method: "GET",
      url: endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  export { addCompany, getCompanies };