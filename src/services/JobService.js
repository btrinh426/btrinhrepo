import axios from "axios";

let addJob = (payload) =>
{
  const config= {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/jobs",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {"Content-Type": "application/json"}
  }
  return axios(config)
}

let getJobs = () =>{
  const config = {
    method: "GET",
    url:"https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=25",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
}
return axios(config)
}

let editJob = (id, payload) =>
{
  const config = {
    method: "PUT",
    url:"https://api.remotebootcamp.dev/api/jobs/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
    }

  return axios(config)
}

let getJobById = (id) =>{
  const config = {
    method: "GET",
    url:"https://api.remotebootcamp.dev/api/jobs/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
}
return axios(config)
}

export { addJob, getJobs, editJob, getJobById }