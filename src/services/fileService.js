import axios from "axios";

var fileService = {
  endpoint: "https://api.remotebootcamp.dev/api/files",
};

let picture = (data) => {
  const config = {
    method: "POST",
    url: fileService.endpoint,
    data: data,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { picture };
