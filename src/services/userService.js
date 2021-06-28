import axios from "axios";

var usersService = {
  endpoint: "https://api.remotebootcamp.dev/api/users"
}
  
 let logIn = () => {
    var payload = {
      "email": "mobabbage@gmail.com",
      "password": "13Puppies!",
      "tenantId": "U015ZRKTQN4"
    };
    console.log("Logging in");
    const config = {
      method: "POST",
      url: usersService.endpoint + "/login",
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
      .then(function (data) { 
        console.log(data); 
        return data;
      })
      .catch(function (data) { 
        console.warn(data); 
      });
  }


  let register = (newUser) => {
  
    const config = {
      method: "POST",
      url: usersService.endpoint + "/register",
      data: newUser,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config)
      .then(function (data) { 
        console.log(data); 
        return data;
      })
      .catch(function (data) { 
        console.warn(data); 
      }); 
  };


export { logIn, register}; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }