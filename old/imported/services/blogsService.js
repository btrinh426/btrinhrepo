var blogsService = {
    endpoint: "https://api.remotebootcamp.dev/api/blogs"
};

blogsService.getAll = () => {
    console.log("getBlogs is executing");
    const config = {
        method: "GET",
        url: blogsService.endpoint,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

blogsService.add = (payload) => {
    console.log("newBlog is executing", payload);

    const config = {
        method: "POST",
        url: blogsService.endpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

blogsService.getById = (id) => {
    console.log("getById is executing");
    const config = {
        method: "GET",
        url: blogsService.endpoint + "/" + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

blogsService.update = (id, payload) => {
    console.log("Update is executing", payload);

    const config = {
        method: "PUT",
        url: blogsService.endpoint + "/" + id,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};