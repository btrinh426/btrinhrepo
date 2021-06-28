import axios from "axios";

var usersService = {
  endpoint: "https://api.remotebootcamp.dev/api/users",
};

var register = (payload) => {
  
  const config = {
    method: "POST",
    url: usersService.endpoint + "/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

var login = () => {
  let payload = {
    email: "user@google.com",
    password: "Reactpassword123!",
    tenantId: "bootcamp2",
  };

  const config = {
    method: "POST",
    url: usersService.endpoint + "/login",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log("userLogin data: ", data);
    })
};

var simulateLogin = (userId, userName, slackId) => {
  userId = 1234;
  userName = "useruser";
  slackId = "sabio.candidate.id";

  let payload = {
    email: "user@google.com",
    password: "Reactpassword123!",
    tenantId: "bootcamp2",
  };

  const config = {
    method: "GET",
    // https://api.remotebootcamp.dev/api/users/login/?userId=1234&userName=useruser&slackId=sabio.candidate.id
    url:
      usersService.endpoint +
      "/login/" + 
      userId +
      "/" +
      userName +
      "/" +
      slackId,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
    })
};

var getCurrent = () => {

  const config = {
    method: "GET",
    url: usersService.endpoint + "/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);

};

var getById = (id) => {

  const config = {
    method: "GET",
    url: usersService.endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
    
};

var logout = () => {
  let payload = {
    email: "user@google.com",
    password: "Reactpassword123!",
    tenantId: "bootcamp2",
  };

  const config = {
    method: "GET",
    url: usersService.endpoint + "/logout",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(function (data) {
      console.log(data);
    })
};

export { register, login, simulateLogin, logout, getCurrent, getById };
