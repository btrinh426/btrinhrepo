import axios from "axios";

var endpoint = "https://api.remotebootcamp.dev/api/entities/cars";

let postForm = (payload) => {
    console.log("Successfully added info: ", payload)
  
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  };

export { postForm };

