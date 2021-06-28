import axios from "axios"

let addProduct = (payload) => {
    console.log("Add a Product is executing", payload);
  
    const config = {
      method: "POST",
      url: "https://api.remotebootcamp.dev/api/entities/products/",
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  };
  
  export { addProduct };