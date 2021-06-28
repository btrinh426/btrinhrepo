var usersService = {
  endpoint: "https://api.remotebootcamp.dev/api/users"
};

usersService.add = (payload) => {

  const config = {
    method: "POST",
    url: usersService.endpoint + "/register",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

usersService.login = (payload) => {

  const config = {
    method: "POST",
    url: usersService.endpoint + "/login",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
};

usersService.logout = () => {
  console.log("Logout is executing");
  const config = {
    method: "GET",
    url: usersService.endpoint + "/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

usersService.currentUser = () => {
  console.log("currentUser is executing");
  const config = {
    method: "GET",
    url: usersService.endpoint + "/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};

usersService.getById = (id) => {
  console.log("getById is executing");
  const config = {
    method: "GET",
    url: usersService.endpoint + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};