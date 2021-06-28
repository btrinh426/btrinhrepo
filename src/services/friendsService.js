import axios from "axios";
import { onGlobalSuccess, onGlobalError } from "./serviceHelper";



//check response for unpacking of success/err messages 

var friends = {
    endpoint: "https://api.remotebootcamp.dev/api/friends"
    , dotnetEndpoint: "http://localhost:50000/api/friends/"
}
const buildFriend = (payload) => { //OK//

    const config = {
        method: "POST",
        url: friends.dotnetEndpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteFriend = (id) => { //OK//

    const config = {
        method: "DELETE",
        url: friends.dotnetEndpoint + id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(() => id).catch(onGlobalError);
}

const updateFriend = (payload) => {

    const config = {
        method: "PUT",
        url: friends.dotnetEndpoint + payload.id,
        data: payload,
        withCredentials: true,
        crossdomain: true,

        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const searchFriend = (payload) => {
    const config = {
        method: "GET",
        url: friends.dotnetEndpoint + payload,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const showFriends = () => {
    const config = {
        method: "GET",
        url: friends.dotnetEndpoint,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};



export { buildFriend, deleteFriend, updateFriend, searchFriend, showFriends }

