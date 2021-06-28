
var entityService = {
  endPt: "https://api.remotebootcamp.dev/api/users",
  endpoint: "https://api.remotebootcamp.dev/api/entities/cars/",
};

entityService.userLogin = () => {
  var payload = {
    email: "ledwyn@sabio.com",
    password: "Sabio123!",
    tenantId: "U01KN0UH2DN",
  };
  // { REGISTER "POST"
  // "id": 5097,  // not used to register
  //   "firstName": "Ledwyn",
  //   "lastName": "Mena",
  //   "email": "ledwynm@sabio.com",
  //   "password": "Sabio1234!",
  //   "passwordConfirm": "Sabio1234!",
  //   "avatarUrl": "https://via.placeholder.com/151",
  //   "tenantId": "U01KN0UH2DN"
  // }
  const config = {
    method: "POST",
    url: entityService.endPt + "/login",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
//---------
entityService.getAll = () => {
  console.log("Showing all Cars");

  const config = {
    method: "GET",
    url: entityService.endpoint,
    // data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

entityService.add = (data) => {
  console.log("Add a Car is executing", data);

  const config = {
    method: "POST",
    url: entityService.endpoint,
    data: getFormData(),
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

entityService.delete = (id) => {
  console.log("Deleting  the following car with id:", id);

  const config = {
    method: "DELETE",
    url: entityService.endpoint + id,
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(()=> id)
};

entityService.update = (data) => {
  console.log("Updating car:", data);

  const config = {
    method: "PUT",
    url: entityService.endpoint + $("#inputId").val(),
    data: getFormData(),
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
