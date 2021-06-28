import axios from "axios";

let addProduct = (payload) => {
 
  const config = {
  method: "POST",
  url:"https://api.remotebootcamp.dev/api/entities/records",
  data: payload,
  withCredentials: true,
  crossdomain: true,
  headers: { "Content-Type": "application/json" }

};

return axios(config);
}


export { addProduct };