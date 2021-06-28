import axios from "axios";

let addNewFriend = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/friends",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addNewFriend };
