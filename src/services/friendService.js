import axios from "axios";
import{API_HOST_PREFIX, onGlobalSuccess, onGlobalError} from "./serviceHelper";

const endpoint = "http://localhost:50000/api/friends/";


function getFriends(index, size)
{
   console.log(`${endpoint}/paginate?pageIndex=${index}&pageSize=${size}`)
    const config = {
        method: "GET",
        url : endpoint+"paginate?pageIndex="+index+"&pageSize="+size,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
   
    return axios(config)//.then(onGlobalSuccess).catch(onGlobalError)

}
function addFriend(payload) {



    console.log("Trying to add a new friend");

    const config = {
        method: "POST",
        url: endpoint,
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
        url: endpoint + newURL,
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
        url: endpoint + newURL,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)
}
function searchFriends(fsearch, index, pageSize)
{
    //hardcoding in the pagination for sanitys sake
    let newURL = String(fsearch);
    const config = {
        method: "GET",
        url: `${endpoint}/paginate?pageIndex=${index}"&pageSize=${pageSize}&search=${newURL}`,
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
        url: endpoint + newURL,
        //data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(() => id);
};

export {getFriends, addFriend, getFriendById, updateFriend, 
    searchFriends, deleteFriend }; 