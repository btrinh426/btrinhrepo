import axios from "axios"


let  endpoint= "https://api.remotebootcamp.dev/api/entities/"


let submitData = (payload) => {
    console.log("submitData is firing")
    console.log(payload)
    const config = {
        method: "POST",
        url: `${endpoint}products`,
        data: payload,
        crossdomain: true,
        headers: {"Content-type": "application/json"},
    };

    return axios(config)
}


export {submitData}