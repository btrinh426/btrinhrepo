import axios from "axios";



let entityByName = (entityName) => {

    const config = {
      method: "GET",
      url: "https://api.remotebootcamp.dev/api/entities/" + entityName,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  let createEntity = (entityName, payload) => {

    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/entities/" + entityName,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };

    return axios(config);
  }








export default {entityByName, createEntity} ;