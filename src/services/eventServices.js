import axios from 'axios'

const endpoint = 'https://api.remotebootcamp.dev/api/events/';

let add = (payload) => {
    const config = {
        method: "POST",
        url: endpoint,
        data: payload,
        crossdomain: true,
        headers: { "content-Type": "application/json" },
    };
    return axios(config);
};

let update = (id, payload) => {
    const config = {
        method: "PUT",
        url: endpoint + id,
        data: payload,
        crossdomain: true,
        headers: { "content-Type": "application/json" },
    };
    return axios(config);
};

let findByDate = (pageIndex, pageSize, dateStart, dateEnd) => {
    const config = {
        method: 'GET',
        url: endpoint + `search?pageIndex=${pageIndex}&pageSize=${pageSize}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
        crossdomain: true,
        headers: { "content-Type": "application/json" },
    };
    return axios(config);
}
let findByLocation = (latitude, longitude, radius) => {
    const config = {
        method: 'GET',
        url: endpoint + `search/geo?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
        crossdomain: true,
        headers: { "content-Type": "application/json" },
    }; return axios(config)
}
let getUpcoming = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: endpoint + `feed?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "content-Type": "application/json" },
    };
    return axios(config)
};
let getComingSoon = () => {
    const config = {
        method: 'GET',
        url: endpoint + 'feeds',
        crossdomain: true,
        headers: { "content-Type": "application/json" },
    };
    return axios(config);
}
let getBySlug = (slug) => {
    const config = {
        method: 'GET',
        url: endpoint + slug,
        crossdomain: true,
        headers: { "content-Type": "application/json" },
    };
    return axios(config);
};

export { add, update, findByDate, findByLocation, getBySlug, getUpcoming, getComingSoon }