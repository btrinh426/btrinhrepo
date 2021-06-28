var friendsService = {
    endpoint: "https://api.remotebootcamp.dev/api/friends"
};

friendsService.getPaginated = (pageIndex, pageSize) => {
    console.log("getPaginated friends is firing");
    const config = {
        method: "GET",
        url: friendsService.endpoint + `/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

friendsService.getPaginatedSearch = (friendName) => {
    console.log("getPaginatedSearch friends is firing", friendName);
    const config = {
        method: "GET",
        url: friendsService.endpoint + `/search?pageIndex=0&pageSize=10&q=${friendName}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

friendsService.add = (payload) => {
    console.log("add is executing", payload);

    const config = {
        method: "POST",
        url: friendsService.endpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

friendsService.update = (payload) => {
    console.log("Update is executing", payload);

    const config = {
        method: "PUT",
        url: friendsService.endpoint + `/${payload.id}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    console.log("cleared config")

    return axios(config);
};

friendsService.statusUpdate = (id) => {
    console.log("Status Update is executing with ", id);
    const config = {
        method: "PUT",
        url: friendsService.endpoint + `/${id}/Deleted`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

friendsService.getById = (id) => {
    console.log("getById is executing");
    const config = {
        method: "GET",
        url: friendsService.endpoint + "/" + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};
