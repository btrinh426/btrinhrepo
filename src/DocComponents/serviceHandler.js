import axios from "axios";

let logIn = () => {

 const data = {
        "email": "mikeHarry@yahoo.com",
        "password": "1qazxsw2!QAZXSW@",
        "tenantId": "123"
 };

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: data,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};


export default {logIn}; 