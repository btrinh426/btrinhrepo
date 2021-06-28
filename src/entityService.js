import axios from "axios";

var entityService = {
  endpoint: "https://api.remotebootcamp.dev/api/entities",
}
  var usersService = {
    endpoint: "https://api.remotebootcamp.dev/api/users",

};
var add = (payload) => {
  const config = {
    method: "POST",
    url: entityService.endpoint + "/" + payload.name,
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

  export { add, login };