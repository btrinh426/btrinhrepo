import axios from "axios";
import {onGlobalSuccess, onGlobalError} from "./serviceHelper"

const endpoint = "https://api.remotebootcamp.dev/api/entities";

const add = (entityName, payload) => { // AXIOS
  // POST
  // console.log("... addEntity is executing ...", payload);

  const entityPath = `/${entityName}`;

  const config = {
    method: "POST",
    url: endpoint + entityPath,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);

  // return axios(config).then(function (data) {
  //   return { data, entityName, payload };
  // });
};



// ========================================== GET ALL ===================

const getAllByName = (entityName) => { // XXX axios implementation
  // GET
  // console.log("... getAllByName is executing ... ");

  const entityPath = `/${entityName}`;

  const config = {
    method: "GET",
    url: endpoint + entityPath,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);

  // return axios(config).then(function (data) {
  //   return { data, entityName };
  // });
};


// ========================================== GET SPECIFIC ===================


const getSpecificRecord = (entityName, id) => {
  // GET
  // console.log("... getSpecificRecord is executing ... ");

  const entityPath = `/${entityName}/${id}`;

  const config = {
    method: "GET",
    url: endpoint + entityPath,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);

  // return axios(config).then(function (data) {
  //   return { data, entityName };
  // });
};

// -----------------------


// =========================================== UPDATE ==================

const replaceContents = (entityName, id, payload) => {
  // PUT
  // console.log("... replaceContents is executing ... ");

  const entityPath = `/${entityName}/${id}`;
  // console.log(usersService.endpoint + pageGrab);

  const config = {
    method: "PUT",
    url: endpoint + entityPath,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);

  // return axios(config).then(function (data) {
  //   // console.log(data);
  //   return { data, id, entityName, payload };
  // });
  // .catch(function (data) {
  //   // console.warn(data);
  //   return data;
  // });
};


// =========================================== PATCH ==================

const addToOrUpdateProps = (entityName, id, payload) => {
  // PATCH
  // console.log("... addToOrUpdateProp is executing ... ");

  const entityPath = `/${entityName}/${id}`;
  // console.log(usersService.endpoint + pageGrab);

  const config = {
    method: "PATCH",
    url: endpoint + entityPath,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);

  // return axios(config)
  //   .then(function (data) {
  //     // console.log(data);
  //     return data;
  //     // return{ data, pageIndex}
  //   })
  //   .catch(function (data) {
  //     // console.warn(data);
  //     return data;
  //   });
};

// ================================= DELETE ===========================

const deleteVaxios = (entityName, entityId) => {
  // DELETE
  // console.log("... entity-delete is executing ...", entityName, id);
  // const breakingId = 181818181818;

  const entityPath = `/${entityName}/${entityId}`;

  const config = {
    method: "DELETE",
    url: endpoint + entityPath,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).then(()=>entityId).catch(onGlobalError);

  // return axios(config);
};

// -------------------------

export {add, getAllByName, getSpecificRecord, addToOrUpdateProps, replaceContents, deleteVaxios };