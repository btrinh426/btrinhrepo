import axios from "axios";

let  userEndpoint = "https://api.remotebootcamp.dev/api/";

// {
    // name: [null],
    // manufacturer: [null],
    // description: [null],
    // cost: [null],
//   }
const addProduct = (product) => {
    const config = {
        method: "POST",
        url: `${userEndpoint}entities/products`,
        data: product,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);  
}

export {addProduct}