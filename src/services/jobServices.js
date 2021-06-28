import axios from "axios";

let jobUrl = "https://api.remotebootcamp.dev/api/jobs";

const getAllJobs = (index,pageSize) =>
{
    
    const config = {
        method: "GET",
        url: jobUrl + index +pageSize,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}
const addNewJob = (payload) =>
{
    //temporary to fix the skills 
    //couldnt get it to stick in state before the call
    let skills = String(payload.skills);
    let skillString = skills.split(",");
  
    payload.skills = skillString;

    console.log(payload)
    const config = {
        method: "POST",
        url: jobUrl,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(() => payload);

}
const getJobById = (id) =>
{
    
  
    const config = {
        method: "GET",
        url: jobUrl+ "/" +id,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

    
}
const searchJobs = (search) =>
{
    //hardcoding in the pagination for sanitys sake
 
    const config = {
        method: "GET",
        url: jobUrl+"/search?pageIndex=0&pageSize=10&searchTerm="+ search,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}
const updateJob = (jobId, payload) =>
{
    console.log(payload);
    console.log(jobId);
    
    const config = {
        method: "PUT",
        url: jobUrl+ "/"+jobId,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
}
const deleteJob = (id, newStatus) => {
    //this is really a statusID change*

    let newURL = "/" + String(id) +"/" +String(newStatus);

    const config = {
        method: "PUT",
        url: jobUrl + newURL,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

};

export {getAllJobs, deleteJob, getJobById, searchJobs, addNewJob, updateJob}