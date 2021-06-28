import Axios from "axios";

let CarRegister = (payload) => {
  const config = {
    method: "Post",
    url: "https://api.remotebootcamp.dev/api/entities/cars",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return Axios(config);
};
export { CarRegister };
