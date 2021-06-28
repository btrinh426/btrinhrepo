import axios from "axios";

const endpoint = "https://api.remotebootcamp.dev/api/entities/"

let submit = (payload) => {

    const config = {
      method: "POST",
      url: endpoint + "/vehicles",
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  };

//   let getCars = (payload) => {

//     const config = {
//       method: "GET",
//       url: endpoint + "/cars",
//       data: payload,
//       withCredentials: true,
//       crossdomain: true,
//       headers: { "Content-Type": "application/json" }
//     };
  
//     return axios(config);
//  };

//let filterCars = (payload) => {

  //     const config = {
  //       method: "GET",
  //       url: endpoint + "/cars",
  //       data: payload,
  //       withCredentials: true,
  //       crossdomain: true,
  //       headers: { "Content-Type": "application/json" }
  //     };
    
  //     return axios(config);
  //  };

export {submit};