import axios from "axios";


export let updateFriend = (payload) => {

    var payload = {
        "title": friendData.title,
        "bio": friendData.bio,
        "summary": friendData.summary,
        "headline": friendData.headline,
        "slug": friendData.slug,
        "statusId": friendData.statusId,
        "primaryImage": friendData.primaryImage
    }
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config);
};

export default updateFriend

