import axios from "axios";

const usersService = {
  endpoint: "https://api.remotebootcamp.dev/api/users",
  tenantId: "U01GA18K2E5",
};

export const register = function (newUser) {
  const payload = {
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: newUser.password,
    passwordConfirm: newUser.passwordConfirm,
    avatarUrl: newUser.avatarUrl,
    tenantId: usersService.tenantId,
  };

  const config = {
    method: "POST",
    url: usersService.endpoint + `/register`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export const signIn = function (user) {
  var payload = {
    email: user.email,
    password: user.password,
    tenantId: usersService.tenantId,
  };

  const config = {
    method: "POST",
    url: usersService.endpoint + `/login`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export const getCurrentUser = function () {
  const config = {
    method: "GET",
    url: usersService.endpoint + `/current`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export const getUserInfoById = function (id) {
  const config = {
    method: "GET",
    url: usersService.endpoint + `/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export const logout = function () {
  const config = {
    method: "GET",
    url: usersService.endpoint + `/logout`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
