import axios from "axios";

let productApi = "https://api.remotebootcamp.dev/api/entities/products"

let addOneProduct = (payload) => {

    const config = {
      method: "POST",
      url: productApi,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
    // .then(function(response){
        
    //     payload.id = response.data.item
    //     return payload
    // })
  
  };
  
  export default {addOneProduct}