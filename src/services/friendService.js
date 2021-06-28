import axios from "axios"

const addFriend = (payload) => {
	const config = {
		method: "POST",
		url: "https://localhost:50001/api/friends",
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
		url: "https://localhost:50001/api/friends/",
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

const deleteFriend = (payload) => {
	const config = {
		method: "DELETE",
		url: "https://localhost:50001/api/friends/" + payload,

		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config).then(() => payload)
}

const getOneFriend = (friend) => {
	const config = {
		method: "GET",
		url: "https://localhost:50001/api/friends/" + friend,

		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

const editFriend = (payload) => {
	const config = {
		method: "PUT",
		url: "https://localhost:50001/api/friends/" + payload.id,
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	}

	return axios(config)
}

export { addFriend, getOneFriend, getFriends, deleteFriend, editFriend }
