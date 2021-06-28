import axios from "axios";

const endpoint = "https://api.remotebootcamp.dev/api/techcompanies";

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

  let getJob = () => {
    console.log("Successfully added job!");
  
      const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/techcompanies?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config)
    };




export { addCompany, getJob };