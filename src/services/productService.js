import axios from "axios";

let add = (payload) =>
{
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api//entities/products",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
}

let get = () =>
{
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api//entities/products",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
}

export { add, get }