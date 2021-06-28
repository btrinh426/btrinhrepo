import axios from "axios"

var entityService = {
    endpoint: "https://api.remotebootcamp.dev/api/entities/"
}

entityService.submitData = (payload) => {
    console.log("submitData is firing")
    console.log(payload)
    const config = {
        method: "POST",
        url: `${entityService.endpoint}products`,
        data: payload,
        crossdomain: true,
        headers: {"Content-type": "application/json"},
    };

    return axios(config)
}


export {entityService}