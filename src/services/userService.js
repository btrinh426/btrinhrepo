import axios from "axios";
var usersService = {
  endpoint: "https://localhost:50001/api/users",
};
var register = (payload) => {
  // {
  //   "firstName": "string",
  //   "lastName": "string",
  //   "email": "john@example.com",
  //   "password": "String!123456",
  //   "passwordConfirm": "String!123456",
  //   "avatarUrl": "https://i.imgur.com/1o1zEDM.png",
  //   "tenantId": "string1"
  // }
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
var login = payload => {
  // let payload = {
  //   email: "user@google.com",
  //   password: "Reactpassword123!",
  //   tenantId: "bootcamp2",
  // };
  const config = {
    method: "GET",
    url: "https://localhost:50001/api/temp/auth/login/8343/seth/CEO",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    // .then(function (data) {
    //   console.log("userLogin data: ", data);
    // })
    // .catch(function (data) {
    //   console.warn(data);
    // });
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
    .catch(function (data) {
      console.warn(data);
    });
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
var getUserById = (id) => {
  const config = {
    method: "GET",
    url: usersService.endpoint + "/" + id,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
var userLogout = () => {
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
    .catch(function (data) {
      console.warn(data);
    });
};
export { register, login, simulateLogin, userLogout, getCurrent, getUserById };