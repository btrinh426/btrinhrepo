import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/entities/Products"

let addProduct = (payload, onSuccess, onError) => {

    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };
  
  export { addProduct };