import axios from 'axios'

let TechCompanyService = {};

TechCompanyService.getTechCompanies = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/techcompanies?pageIndex=0&pageSize=100",
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export default TechCompanyService