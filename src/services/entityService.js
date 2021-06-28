import axios from "axios";

const entityService = {
  add: "https://api.remotebootcamp.dev/api/entities/assessments",
  getAll: "https://api.remotebootcamp.dev/api/entities/assessments",
};

let addItem = (itemData) => {
  const config = {
    method: "POST",
    url: entityService.add,
    data: itemData,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
let getAllItems = () => {
  const config = {
    method: "GET",
    url: entityService.getAll,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { entityService, addItem, getAllItems }; // export all your calls here
