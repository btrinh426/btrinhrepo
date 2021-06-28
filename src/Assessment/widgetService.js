import axios from "axios";

let addNewWidget = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/entities/Widgets",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addNewWidget };
