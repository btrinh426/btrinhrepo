import axios from "axios"
axios.defaults.withCredentials = true
// Add a request interceptor
axios.interceptors.request.use(function (config) {
	config.withCredentials = true
	return config
})

/**
 * Will unpack the response body from reponse object
 * @param {*} response
 *
 */
const onGlobalSuccess = (response) => {
	/// Should not use if you need access to anything other than the data
	return response.data
}

const onGlobalError = (err) => {
	return Promise.reject(err)
}

let login = (payload) => {
	const config = {
		method: "POST",
		url: "https://api.remotebootcamp.dev/api/users/login",
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

let register = (payload) => {
	const config = {
		method: "POST",
		url: "https://api.remotebootcamp.dev/api/users/register",
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

let getCurrent = () => {
	const config = {
		method: "GET",
		url: "https://api.remotebootcamp.dev/api/users/current",
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

let getUser = (payload) => {
	const config = {
		method: "GET",
		url: "https://api.remotebootcamp.dev/api/users/" + payload,
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

let logout = () => {
	const config = {
		method: "GET",
		url: "https://api.remotebootcamp.dev/api/users/logout",

		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

let addFriend = (payload) => {
	const config = {
		method: "POST",
		url: "https://api.remotebootcamp.dev/api/friends",
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}
let getFriends = () => {
	const config = {
		method: "GET",
		url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=4",
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

const API_HOST_PREFIX = process.env.REACT_APP_API_HOST_PREFIX
const API_NODE_HOST_PREFIX = process.env.REACT_APP_API_NODE_HOST_PREFIX

console.log("API_HOST_PREFIX", API_HOST_PREFIX)

export {
	onGlobalError,
	onGlobalSuccess,
	API_HOST_PREFIX,
	API_NODE_HOST_PREFIX,
	login,
	register,
	getCurrent,
	getUser,
	logout,
	addFriend,
	getFriends,
}
