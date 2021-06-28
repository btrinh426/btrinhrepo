import axios from "axios";

const techPoint = "https://api.remotebootcamp.dev/api/techcompanies";
const jobPoint = "https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=10";

let addCompany = (payload) => {
  console.log("Successfully added company: ", payload)

  const config = {
    method: "POST",
    url: techPoint,
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
      url: jobPoint,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  };


let addJob = (payload) => {
  console.log("Successfully added company: ", payload)

  const config = {
    method: "POST",
    url: jobPoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

  

export { addCompany, getJob,addJob };