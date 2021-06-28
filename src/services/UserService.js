import axios from "axios";


let logIn = (payload) => {
 
    const config = {
    method: "POST",
    url:"https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }

  };

  return axios(config);
}

let current = () => 
{
  const config = {
  method: "GET",
  url:"https://api.remotebootcamp.dev/api/users/current",
  withCredentials: true,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
  }
return axios(config)
}

let currentById = (id) => 
{
  const config = {
  method: "GET",
  url:"https://api.remotebootcamp.dev/api/users/" + id,
  withCredentials: true,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }
  }
return axios(config)
}

let logOut = () =>
{
  const config = {
    method: "GET",
    url:"https://api.remotebootcamp.dev/api/users/logout",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
    }
  return axios(config)
}

let addRecord = (payload) => {
  const config = {
    method: "POST",
    url:"https://api.remotebootcamp.dev/api/entities/records",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }

  };

  return axios(config);

}

let register = (payload) => {
  const config = {
    method: "POST",
    url:"https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }

  };

  return axios(config);

}



export { logIn, addRecord, register, current, currentById, logOut };