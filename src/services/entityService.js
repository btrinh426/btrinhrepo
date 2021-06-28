import axios from "axios";

var carService = {
  endpoint: "https://api.remotebootcamp.dev/api/entities/cars",
};

// ----- Add New Car -----

let add = (car) => {
  const config = {
    method: "POST",
    url: carService.endpoint,
    data: car,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
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

export { add };
