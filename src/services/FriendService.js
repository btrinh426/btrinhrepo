import axios from 'axios';

let getFriends = (index, size) =>{
    const config = {
        method: 'GET',
        url: `https://api.remotebootcamp.dev/api/friends?pageIndex=${index}&pageSize=${size}`,
        crossDomain: true,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

let makeFriend = () =>{
    let payload = {
        "title": "Piotr Wiecek",
        "bio": "I am a Formula Drift driver and prefer to drive sideways.",
        "summary": "Professional Drifter",
        "headline": "Falken Drifter",
        "slug": "91211",
        "statusId": "1",
        "primaryImage": "http://news.formulad.com/wordpress/wp-content/uploads/2018/04/LOU_8909-600x400.jpg"
    }
    const config = {
        method: 'POST',
        url: "https://api.remotebootcamp.dev/api/friends",
        data: payload,
        crossDomain: true,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

let deleteFriend = (id) =>{
    const config = {
        method: 'DELETE',
        url: `https://api.remotebootcamp.dev/api/friends/${id}`,
        crossDomain: true,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
    .then((response)=>{
        return id;
    })
}

export { getFriends, makeFriend, deleteFriend };