import axios from "axios";

let jobService ={
    endpoint: "https://api.remotebootcamp.dev/api/jobs"
}
let addJob = (payload) => {

    const config = {
      method: "POST",
      url:  jobService.endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };
  let updateJobs=(payload,id)=>{
    const config = {
        method: "PUT",
        url:  jobService.endpoint+"/"+id,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);

  }

  let searchJobs=(name)=>{
    const config = {
        method: "Get",
        url: jobService.endpoint+"/search?pageIndex=0&pageSize=6&q="+name,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }

        return axios(config);
  }


  let getJoblist=(page)=>{
    const config = {
        method: "get",
        url: jobService.endpoint+"?pageIndex="+ (page - 1) +"&pageSize=6",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config);
  }

  export {addJob,updateJobs,searchJobs,getJoblist}