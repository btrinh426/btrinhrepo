import axios from "axios"

let postEntity = (payload) => {

    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/entities/names",
      data: payload,
      withCredentials: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };
  
export {postEntity,}

