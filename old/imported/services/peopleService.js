var peopleService = {
    endpoint: "https://api.remotebootcamp.dev/api/people/"
};

peopleService.getPaginated = (pageIndex, pageSize) => {
    console.log("getPaginated is executing");
    const config = {
        method: "GET",
        url: peopleService.endpoint + `paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};