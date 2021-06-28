import axios from "axios";

var jobService = {
  endpoint: "https://api.remotebootcamp.dev/api/jobs",
};

var add = (payload) => {
    
    const config = {
      method: "POST",
      url: jobService.endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

  var getAll = (pageIndex, pageSize) => {
    
    const config = {
      method: "GET",
      url: jobService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

export { add, getAll }; 
