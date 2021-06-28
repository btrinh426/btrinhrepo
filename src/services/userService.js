import axios from "axios";

var usersService = {
    endpoint: "https://api.remotebootcamp.dev/api/users"
  };

usersService.userLogin = (payload) => {
    console.log("login is executing");
    const config = {
      method: "POST",
      url: `${usersService.endpoint}/login`,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  };
  
usersService.whoIsLoggedIn = () => {
    console.log("who is logged in is executing");
    const config = {
      method: "GET",
      url: `${usersService.endpoint}/current`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  };

  usersService.getInfoById = (currentId) => {
    console.log("getInfoById is executing");
    const config = {
      method: "GET",
      url: `${usersService.endpoint}/${currentId}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  };
  
usersService.userLogout = () => {
    console.log("logout is executing");
    const config = {
      method: "GET",
      url: `${usersService.endpoint}/logout`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config);
  };

usersService.register = (payload) => {
  console.log("Register is firing")
  console.log({payLoad: payload})
  const config = {
    method: "POST",
    url: `${usersService.endpoint}/register`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
}

usersService.genericUserLogin = () => {
  console.log("genericUserLogin is firing")
  const config = {
    method: "GET",
    url: `${usersService.endpoint}/login/12345/fakeName/slackIdString`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
}

// usersService.practiceRegister = () => {
//   console.log("badRegister is firing")
//   const config = {
//     method: "GET",
//     url: `${usersService.endpoint}/register`,
//     data:{},
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" },
//   };
//   return axios(config)
// }
  

  export {usersService}
  