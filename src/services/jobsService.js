import axios from "axios";

let addJob = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/jobs",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let updateJob = (payload, id) => {
  const config = {
    method: "PUT",
    url: "https://api.remotebootcamp.dev/api/jobs/" + id,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addJob, updateJob };
