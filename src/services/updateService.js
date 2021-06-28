import axios from "axios";

export let updateFriend = (payload) => { 

    var updateData = {
        "title": payload.title,
        "bio": payload.bio,
        "summary": payload.summary,
        "headline": payload.headline,
        "slug": payload.slug,
        "statusId": payload.statusId,
        "primaryImage": payload.primaryImage
    }
    const config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

export default updateFriend

