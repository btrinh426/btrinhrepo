import axios from "axios";

var skillService = {
  endpoint: "https://localhost:50001/api/skills/",
};

// friendsService.getFriends = (pageIndex, pageSize) => {
let getAll = () => {
  const config = {
    method: "GET",
    url: skillService.endpoint,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { getAll }; // export all your calls here
