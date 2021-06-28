import axios from "axios";

const eventsService = {
    endpoint: "https://api.remotebootcamp.dev/api/events"
};

export function getAllEvents(pageIndex, pageSize, dateStart, dateEnd){
    console.log("getAllEvents executing!")
    console.log(dateStart)
    const config = {
        method: "GET",
        url: `${eventsService.endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    }
    return axios(config)
};

export function addEvent(formData){
    console.log("addEvent is executing")
    const config = {
        method: "POST",
        url: `${eventsService.endpoint}`,
        data: formData,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    }
    return axios(config)
};

export function editEvent(payload, id){
    console.log("editEvent is executing!")
    const config = {
        method: "PUT",
        url: `${eventsService.endpoint}/${id}`,
        data: payload,
        crossdomain: true,
        header: {"Content-Type" : "application/json"}
    }
    return axios(config)
};