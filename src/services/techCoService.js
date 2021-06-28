import axios from "axios";

var techCoService = {
  endpoint: "https://api.remotebootcamp.dev/api/techcompanies",
};

// ----- Get Tech Companies -----
let get = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url:
      techCoService.endpoint + `?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(function (data) {
    console.log(data);
    return data;
  });
};

export { get };
