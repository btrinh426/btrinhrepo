import axios from "axios";

var friendService = {
  endpoint: `https://api.remotebootcamp.dev/api/friends`,
  // pageIndex: `pageIndex=0&pageSize=10`
};

let pageOfPeople = (index = "0", pageSize) => {
  const config = {
    method: "GET",
    // make sure you edit this when you ened to....
    url: `${friendService.endpoint}?pageIndex=${index}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let deletePerson = (id) => {
  const config = {
    method: "DELETE",
    url: `${friendService.endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let addPerson = (payload) => {
  const config = {
    method: "POST",
    url: friendService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let editPerson = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${friendService.endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let searchPerson = (searchInfo, page = 0, pageSize = 3) => {
  const config = {
    method: "GET",
    url: `${friendService.endpoint}/search?pageIndex=${page}&pageSize=${pageSize}&q=${searchInfo}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { pageOfPeople, deletePerson, addPerson, editPerson, searchPerson };
