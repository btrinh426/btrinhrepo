import axios from "axios"

const addFriend = (payload) => {
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
const getFriends = () => {
	const config = {
		method: "GET",
		url: "https://api.remotebootcamp.dev/api/friends?pageIndex=0&pageSize=1000",
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

const deleteFriend = (payload) => {
	const config = {
		method: "DELETE",
		url: "https://api.remotebootcamp.dev/api/friends/" + payload,

		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config).then(() => payload)
}

const getOneFriend = (friend) => {
	const config = {
		method: "GET",
		url: "https://api.remotebootcamp.dev/api/friends/" + friend,

		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

const editFriend = (payload) => {
	const config = {
		method: "PUT",
		url: "https://api.remotebootcamp.dev/api/friends/" + payload.id,
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

export { addFriend, getOneFriend, getFriends, deleteFriend, editFriend }
