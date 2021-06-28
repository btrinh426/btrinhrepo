import axios from "axios";

function getAllJobs()
{
    
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=10",
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}

export {getAllJobs}