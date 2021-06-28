import React from "react";

function FriendCard (props){

    const oneFriend = props.friends;

    const onFriendInfo =()=>{
        props.onClick(oneFriend);
    }


    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <img src={oneFriend.primaryImage.imageUrl} className="card-img-top" alt="..."/>
                <h5 className="card-title title">{oneFriend.title}</h5>
                <p className="card-text summary">{oneFriend.summary}</p>
                <button
                type="button" 
                className="btn btn-outline-primary" 
                style={{margin: "5px"}} 
                onClick={onFriendInfo}
                data-id={oneFriend.id}
                >
                Edit
                </button>
                <button type="button"
                className="btn btn-outline-primary"
                data-id={oneFriend.id}
                >Delete</button>
            </div>
        </div>
    )
}

export default FriendCard;