import axios from "axios";

var carService = {
  endpoint: "https://api.remotebootcamp.dev/api/cars",
};

var add = (payload) => {
    
    const config = {
      method: "POST",
      url: carService.endpoint,
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
      url: carService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

export { add, getAll };