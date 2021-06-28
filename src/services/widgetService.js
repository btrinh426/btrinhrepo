import axios from "axios";
const userService = {
	login: "https://api.remotebootcamp.dev/api/users/login",
	reg: "https://api.remotebootcamp.dev/api/users/register",
	logout: "https://api.remotebootcamp.dev/api/users/logout",
	gets: "https://api.remotebootcamp.dev/api/users/",
};
let logIn = (payload) => {
	const config = {
		method: "POST",
		url: userService.login,
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config);
};
let register = (payload) => {
	const config = {
		method: "POST",
		url: userService.reg,
		data: payload,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config);
};
let logOut = () => {
	const config = {
		method: "GET",
		url: userService.logout,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config);
};
let userData = (payload) => {
	const config = {
		method: "GET",
		url: userService.gets + payload,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config);
};
export { userService, logIn, register, logOut, userData }; // export all your calls here
// if you had three functions to export
// export { logIn, register, thirdFunction }
