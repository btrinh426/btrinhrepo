import React from "react";

function Friend(props) {
    //console.log(props)

    function onFriendDeleteBtn() {

        console.log({ "deleteBtn": "I'm working" })

        props.onClick(props.friend.id)
    }

    return (
        <div className="card mt-3" style={{ width: "16rem" }}>
            <img src={props.friend.primaryImage.imageUrl} className="card-img-top" style={{ height: "330px" }} alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.friend.title}</h5>
                <p className="card-text">{props.friend.summary}</p>

                <button className="btn btn-primary" style={{ margin: "2rem" }} >Edit</button>
                <button className="btn btn-danger" type="submit" onClick={() => onFriendDeleteBtn(props.friend)} data-friend-id={props.friend.id} >Delete</button>
            </div>
        </div>
    )
}

export default React.memo(Friend); 