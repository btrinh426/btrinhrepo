import axios from "axios";

const jobApi = "https://localhost:50001/api/jobs"

//https://localhost:50001/api/jobs
let addJob = (payload) => {

    const config = {
      method: "POST",
      url: jobApi,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
    // .then(function(response){
    //     console.log("add job success", response)
    //     payload.id = response.data.item
    //     return payload
    // })
  
  };

let updateOneJobById = (payload, id) => {

    const config = {
      method: "PUT",
      url: jobApi + "/" + id,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
    .then(function(response){
        
        
        return payload
    })
  
  };

let getJobs = (pageIndex) => {

    const config = {
      method: "GET",
      url: jobApi + "?pageIndex=" + pageIndex + "&pageSize=3",
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
    // .then(function(response){
    //     console.log("add book success", response)
    //     payload.id = response.data.item
    //     return payload
    // })
  
  };
  
  let deleteJobById = (id) => {

    const config = {
      method: "Delete",
      url: jobApi + "/" + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
        .then(function(response){
      console.log("add book success", response)
      
      return id
  })
  };

  let getOneJobById = (id) => {
    const config = {
      method: "GET",
      url: jobApi + "/" + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
  }
  
  let searchJob = (data,pageIndex) => {
    
    const config = {
      method: "GET",
      url: jobApi + "/search?pageIndex=" + pageIndex + "&pageSize=3&input=" + data,
     
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
    // .then(function(response){
    //     console.log("add book success", response)
    //     payload.id = response.data.item
    //     return payload
    // })
  
  }
  
  export default {addJob,updateOneJobById,getJobs,deleteJobById,getOneJobById, searchJob }