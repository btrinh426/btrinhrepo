var entitiesService = {
    endpoint: "https://api.remotebootcamp.dev/api/entities"
};

entitiesService.getAll = (eName) => {
    console.log("getAll Entity Records is executing");
    const config = {
        method: "GET",
        url: entitiesService.endpoint + "/" + eName,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

entitiesService.add = (eName, payload) => {
    console.log("newEntities is executing", payload);

    const config = {
        method: "POST",
        url: entitiesService.endpoint + "/" + eName,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

entitiesService.update = (id, payload) => {
    console.log("Update is executing", payload);

    const config = {
        method: "PUT",
        url: entitiesService.endpoint + "/ufcFighters/" + id,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    console.log("cleared config")

    return axios(config);
};

entitiesService.delRecord = (id) => {
    console.log("delRecord is executing");
    const config = {
        method: "DELETE",
        url: entitiesService.endpoint + "/ufcFighters/" + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

//not in use
entitiesService.getById = (eName, id) => {
    console.log("getById is executing");
    const config = {
        method: "GET",
        url: entitiesService.endpoint + "/" + eName + "/" + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};
