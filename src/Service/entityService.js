import axios from "axios"
const addEntity = payload => {
    console.log("Adding entity", payload);

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/products",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
        .then(function (response) {
            console.log(response)
        })
        .catch(function (response) {
            console.error(response)
        });
};

export default addEntity