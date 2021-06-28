import axios from "axios";

let productCreation = (productPayload) => {

//   const productPayload ={
//     name: "",
//     manufacturer:"",
//     description:"",
//     cost:null
//   }

//   console.log(productPayload);

  
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/products",
    data: productPayload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};




export {productCreation} ;