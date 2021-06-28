import axios from 'axios'

let JobsService = {};

JobsService.submitNewJob = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/jobs",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

JobsService.getJobListingById = (jobId) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/jobs/${jobId}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

JobsService.editJobListing = (jobListingId, payload) => {
    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/jobs/${jobListingId}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}



JobsService.getAllJobListings = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/jobs?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

JobsService.getJobsbySearch = (pageIndex, pageSize, query) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/jobs/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${query}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

JobsService.deleteJob = (jobListingId, payload) => {
    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/jobs/${jobListingId}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export default JobsService;