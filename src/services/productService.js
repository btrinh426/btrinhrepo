import axios from "axios";



const addNewProduct = (payload) => {

    console.log(payload);

  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/Products",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

export { addNewProduct}