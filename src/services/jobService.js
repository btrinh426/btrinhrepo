import axios from "axios";

var jobService = {
  endpoint: "https://api.remotebootcamp.dev/api/jobs",
};

// ----- Add New Job -----
let add = (job) => {
  const config = {
    method: "POST",
    url: jobService.endpoint,
    data: job,
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
