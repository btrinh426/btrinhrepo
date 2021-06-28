import axios from "axios";

let logIn = (payload) => {

  const config = {
    method: "_PICK_A_HTPP_METHOD",
    url: "_A_URL_GOES_HERE",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


let register = (payload, onSuccess, onError) => {

  const config = {
    method: "_PICK_A_HTPP_METHOD_FOR_THIS_ENDPOINT",
    url: "_AnOther_URL_GOES_HERE",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


export { logIn, register}; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }