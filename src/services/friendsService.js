import axios from "axios";

const friendsService = {
  endpoint: "https://api.remotebootcamp.dev/api/friends",
  tenantId: "U01GA18K2E5",
  pageIndex: 0,
  pageSize: 10,
};

export const add = (newFriend) => {
  const payload = {
    title: newFriend.title,
    bio: newFriend.bio,
    summary: newFriend.summary,
    headline: newFriend.headline,
    slug: newFriend.slug,
    statusId: newFriend.statusId,
    primaryImage: newFriend.primaryImage,
  };

  const config = {
    method: "POST",
    url: friendsService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export const getAll = () => {
  const config = {
    method: "GET",
    url:
      friendsService.endpoint +
      `?pageIndex=${friendsService.pageIndex}&pageSize=${friendsService.pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
