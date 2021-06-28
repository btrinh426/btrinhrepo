import axios from "axios";

const endpoint = "https://api.remotebootcamp.dev/api/users/"

const registerAccount = (payload, onSuccess, onError) => {

    const config = {
      method: "POST",
      url: endpoint+"register",
      data: payload,
      //withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

const logIn = payload => {
    const config = {
        method: "POST",
        url: endpoint+"login",
        data: payload,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const currentUser = () => {
    const config = {
        method: "GET",
        url: endpoint+"current",
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const getUserById = (payload, onSuccess, onError) => {
    const config = {
        method: "GET",
        url : endpoint+payload,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};

const logOutUser = (onSuccess, onError) => {
    const config = {
        method: "GET",
        url: endpoint+"logout",
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config);
};
export { 
    registerAccount,
    logIn,
    currentUser,
    getUserById,
    logOutUser }; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }