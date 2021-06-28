import axios from "axios";


function getFriends(index, size)
{
    console.log(`index: ` + index + ` size: ` + size );
    
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends?pageIndex="+index+"&pageSize="+size,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

}
function addFriend(payload) {

    console.log("Trying to add a new friend");

    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
   
}
function getFriendById(id)
{
    
  let newURL = String(id);
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends/"+ newURL,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

    
}
function updateFriend(friendId, payload)
{
    let newURL = String(friendId);
    console.log(payload);
    const config = {
        method: "PUT",
        url: "https://api.remotebootcamp.dev/api/friends/"+ newURL,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
}
function searchFriends(fsearch)
{
    //hardcoding in the pagination for sanitys sake
    let newURL = String(fsearch);
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=10&q="+ newURL,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config)
}

function deleteFriend  (id) {

    let newURL = String(id);

    const config = {
        method: "DELETE",
        url: "https://api.remotebootcamp.dev/api/friends/" + newURL,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(() => id);
};

export {getFriends, addFriend, getFriendById, updateFriend, 
    searchFriends, deleteFriend }; 