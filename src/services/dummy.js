import axios from "axios";

axios.defaults.withCredentials = true;

export let currentUser = () => {
    const config = {
        method: "Get",
        url: "https://api.remotebootcamp.dev/api/users/current",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
  
      return axios(config)
}