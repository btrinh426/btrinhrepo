import axios from "axios";

const filesService = {
    endpoint: "https://api.remotebootcamp.dev/api/files"
};

export function uploadFile(file) {
    console.log("uploadFile executing")
    const config = {
        method: "POST",
        url: `${filesService.endpoint}`,
        data: file,
        crossdomain: true,
        header: {"Content-Type" : "multipart/form-data"}
    }
    return axios(config)
};