import axios from "axios";
// import swal from "sweetalert";
import {toast } from 'react-toastify';  
axios.defaults.withCredentials = true;
// Add a request interceptor
axios.interceptors.request.use(function(config) {
  config.withCredentials = true;
  return config;
});

/**
 * Will unpack the response body from reponse object
 * @param {*} response
 *
 */
const onGlobalSuccess = response => {
  /// Should not use if you need access to anything other than the data
  toast.success(' Record was Successfully Submitted!'+response)
  return response;

};

const onGlobalError = err => { 
  toast.error("Submission Error:"+err)
  
  return Promise.reject(err);
  
};



const logIn = (payload) => {
   const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

const testF = (data)=>{
console.log("testF Successfull!",data)
}

const API_HOST_PREFIX = process.env.REACT_APP_API_HOST_PREFIX;
const API_NODE_HOST_PREFIX = process.env.REACT_APP_API_NODE_HOST_PREFIX;

console.log("API_HOST_PREFIX", API_HOST_PREFIX);

export {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
  API_NODE_HOST_PREFIX, logIn, testF
};