import axios from "axios";

var usersService = {
  endpoint: "https://api.remotebootcamp.dev/api/users",
};

var userLogin = () => {

  var payload = {
    email: "user@google.com",
    password: "Reactpassword123!",
    tenantId: "bootcamp2"
  }
  
  const config = {
    method: "POST",
    url: usersService.endpoint + "/login",
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


// userService.register = (payload, onSuccess, onError) => {

//   const config = {
//     method: "_PICK_A_HTPP_METHOD_FOR_THIS_ENDPOINT",
//     url: "_AnOther_URL_GOES_HERE",
//     data: payload,
//     withCredentials: true,
//     crossdomain: true,
//     headers: { "Content-Type": "application/json" }
//   };

//   return axios(config);
// };

export { userLogin }; // export all your calls here

// if you had three functions to export 
// export { logIn, register, thirdFunction }