import axios from "axios";

const submitProducts = (payload) => {
    console.log(payload)
    const config = {
     method: "POST",
     url: "https://api.remotebootcamp.dev/api/entities/products",
     data: payload,
     withCredentials: true,
     crossdomain: true,
     headers: { "Content-Type": "application/json" }
   };
  
   return axios(config);
  };

  const getProducts = (data) => {
    console.log("Get")
    const config = {
     method: "GET",
     url: "https://api.remotebootcamp.dev/api/entities/products",
      withCredentials: true,
     crossdomain: true,
     headers: { "Content-Type": "application/json" }
    
   };
  
   return axios(config);
  };
  

  export{
    submitProducts,
    getProducts

  }