import axios from "axios";

const friendEndpoint = "http://localhost:50000/api/friends";

const addFriend = (friend) => {
  // {
  //   "title": "string",
  //   "bio": "string",
  //   "summary": "string",
  //   "headline": "string",
  //   "slug": "string",
  //   "statusId": "NotSet",
  //   "primaryImageUrl": "string"
  //   "skills": [{"name": "Coding"}, {"name": "Editing"}, {"name": "Talking"}]"
  // }

  const config = {
    method: "POST",
    url: `${friendEndpoint}`,
    data: friend,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const updateFriend = (friend) => {
  //   "title": "UpdatedPerson",
  //   "headline": "UpdatedHeadline",
  //   "bio": "UpdatedBio",
  //   "summary": "UpdatedSummary",
  //   "slug": "AnUpdatedSlug5",
  //   "statusId": "NotSet",
  //   "primaryImageUrl": "SomeUpdatedURLHere",
  //   "skills": [{"name": "Editing"}, {"name": "Cooking"}]

  const config = {
    method: "PUT",
    url: `${friendEndpoint}/${friend.id}`,
    data: friend,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const deleteFriend = (friendId) => {
  const config = {
    method: "DELETE",
    url: `${friendEndpoint}/${friendId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getFriends = (pageIndex, pageSize) => {
  let targetUrl = `${friendEndpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  // console.log(`Target URL to get friends: ${targetUrl}`);
  const config = {
    method: "GET",
    url: targetUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getFriendById = (friendId) => {
  let targetUrl = `${friendEndpoint}/${friendId}`;
  const config = {
    method: "GET",
    url: targetUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const searchFriends = (searchCriteria, pageIndex, pageSize) => {
  let targetUrl = `${friendEndpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&searchString=${searchCriteria}`;
  const config = {
    method: "GET",
    url: targetUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { friendEndpoint, addFriend, updateFriend, deleteFriend, getFriends, getFriendById, searchFriends };
