import React from "react";

const SingleFriend = (props) => {
    const myFriend = props.friend;

    const onEditClicked = function () {
        props.editPerson(myFriend)
        console.log(myFriend, "THIS IS THE ONEDITCLICKED")
    }

    const onDeleteClicked = function () {
        props.deletePerson(myFriend.id)
    }

    return <div className="card">
        <img className="card-img-top" src={myFriend.primaryImage.imageUrl} />
        <div className="card-body">
            <h5 className="card-title">{myFriend.title}</h5>
            <p className="card-text">{myFriend.summary}</p>
            <button className="btn btn-primary"
                onClick={onEditClicked}
                data-friend-id={myFriend.id}>Edit</button>
            <button className="btn btn-warning"
                onClick={onDeleteClicked}
                data-friend-id={myFriend.id}>Delete</button>
        </div>
    </div>;
}

export default React.memo(SingleFriend)