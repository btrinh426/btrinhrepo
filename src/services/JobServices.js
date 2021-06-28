import axios from "axios";

var endpoint = "https://api.remotebootcamp.dev/api/techcompanies";

let addCompany = (payload) => {
    console.log("Successfully added company: ", payload)
  
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  };

  let getCompany = (pageIndex, pageSize) => {
    console.log("Successfully loaded company!");
  
      const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/techcompanies?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config)
    };

let editCompany = (payload, id) => {
  console.log("Successfully edited company: " + id);

    const config = {
      method: "PUT",
      url: endpoint + id,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
};

let currentCompanyWithId = (data, id) => {
  console.log("Welcome with id:", id);

  const config = {
    method: "GET",
    url: endpoint + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then(()=> data)
};

export { addCompany, getCompany, editCompany, currentCompanyWithId };

