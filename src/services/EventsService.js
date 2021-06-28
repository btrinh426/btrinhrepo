import axios from 'axios' 

let EventsService = {};

EventsService.getEvents = (pageIndex,pageSize) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/events/search?pageIndex=${pageIndex}&pageSize=${pageSize}&dateStart=1%2F1%2F2001&dateEnd=1%2F1%2F2023`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

EventsService.updateExisitingEvent = (eventId, eventObj) => {
    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/events/${eventId}`,
        data: eventObj,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

EventsService.createNewEvent = (eventObj) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/events",
        data: eventObj,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

EventsService.deleteEvent = (eventId, eventObj) => {
    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/events/${eventId}`,
        data: eventObj,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}

export default EventsService;
