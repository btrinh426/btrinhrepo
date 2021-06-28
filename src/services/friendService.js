import axios from "axios";
import * as helper from "./serviceHelper";

let endpoint = "https://localhost:50001/api/friends";
// let endpoint = "https://api.remotebootcamp.dev/api/friends";

let addFriend = (payload) => {
  console.log("addFriend is firing");
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let paginatedFriendList = (index, numPerPg) => {
  console.log("paginatedFriendList is firing");
  const config = {
    method: "GET",
    url: `${endpoint}/paginate/?pageIndex=${index}&pageSize=${numPerPg}`,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let updateFriendWithId = (payload, id) => {
  console.log("updateFriendWithId is firing");
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getRecordWithId = (id) => {
  console.log("getRecordWithId is firing");
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let deleteRecordWithId = (id) => {
  console.log("deleteRecordWithId is firing");
  const config = {
    method: "DELETE",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let searchForFriend = (pgIndex, numPerPg, query) => {
  console.log("searchForFriend is firing");
  const config = {
    method: "GET",
    url: `${endpoint}/search/?pageIndex=${pgIndex}&pageSize=${numPerPg}&q=${query}`,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let updateStatus = (id, status) => {
  console.log("updateStatus is firing");
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}/${status}`,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let findFriendBySlug = (slug) => {
  console.log("findFriendBySlug is firing");
  const config = {
    method: "GET",
    url: `${endpoint}/${slug}`,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export {
  addFriend,
  paginatedFriendList,
  updateFriendWithId,
  getRecordWithId,
  deleteRecordWithId,
  searchForFriend,
  updateStatus,
  findFriendBySlug,
};
