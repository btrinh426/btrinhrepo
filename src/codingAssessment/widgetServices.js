import axios from "axios";

let create = (payload) => {

    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/entities/shoes",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

export {create}; 