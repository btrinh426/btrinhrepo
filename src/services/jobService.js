import axios from "axios";

const jobApi = "https://api.remotebootcamp.dev/api/jobs"

let addJob = (payload) => {

    const config = {
      method: "POST",
      url: jobApi,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
    .then(function(response){
        console.log("add job success", response)
        payload.id = response.data.item
        return payload
    })
  
  };

  export default {addJob}