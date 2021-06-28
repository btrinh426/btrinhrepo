import axios from "axios"

const login = (payload) => {
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

const register = (payload) => {
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

const getCurrent = () => {
	const config = {
		method: "GET",
		url: "https://api.remotebootcamp.dev/api/users/current",
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

const getUser = (payload) => {
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

const logout = () => {
	const config = {
		method: "GET",
		url: "https://api.remotebootcamp.dev/api/users/logout",

		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

export { login, logout, getCurrent, getUser, register }
