import axios from "axios";
const jobServices = {
    get: "https://api.remotebootcamp.dev/api/jobs?pageIndex=0&pageSize=10",
};
const getAllJobs = () => {
    const config = {
        method: "POST",
        url: jobServices.post,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

export { getAllJobs };
