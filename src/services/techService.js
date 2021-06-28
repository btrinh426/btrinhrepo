import axios from "axios";

var techService = {
  endpoint: "https://api.remotebootcamp.dev/api/techcompanies",
};

var add = (payload) => {
    
    const config = {
      method: "POST",
      url: techService.endpoint,
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
      url: techService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

export { add, getAll }; 

