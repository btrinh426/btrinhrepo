import axios from "axios";

//template
let addCars = (payload) => {
	
    
    var payload = {
		Name: ["Civic"],
		Manufacturer: ["Honda"],
		Description: ["Compact"],
		Cost: [4000],
	};

	const config = {
		method: "POST",
		url: "https://api.remotebootcamp.dev/api/entities/Cars",
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};

	return axios(config);
};

let getCars = (payload, onSuccess, onError) => {
	const config = {
		method: "GET",
		url: "https://api.remotebootcamp.dev/api/entities/Cars/1682792925",
		data: payload,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};

	return axios(config);
};

export { logIn, register }; // export all your calls here

// if you had three functions to export
// export { logIn, register, thirdFunction }
