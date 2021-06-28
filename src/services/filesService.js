import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/files";

const upload = (form) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: form,
    crossdomain: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios(config);
};

export { upload };
