import React from "react";
import "./Friends.css";

const FriendCard = props => {
    let friend = props.friend;
    const deleteFunc = props.delete;
    const editFunc = props.edit;
    let itemKey = friend.id;
    //console.log(friend, friend.imgUrl);

    return (
        <>
            <div className="col mb4">
                <div
                    key={friend.id}
                    className="card friend-card"
                    style={{ width: "18rem" }}
                >
                    <img
                        className="friend-pic"
                        src={friend.imgUrl || friend.primaryImage}
                        alt="What a mench"
                    ></img>
                    <div id="bodyofcard" className="card-body">
                        <h5 id="title" className="card-title">
                            {friend.title}
                        </h5>
                        <p id="summary" className="card-text">
                            {friend.summary}
                        </p>
                    </div>
                    <ul
                        className="list-group"
                        style={{
                            color: "dodgerblue",
                            fontFamily: '"Signika", sans-serif',
                        }}
                    >
                        <li id="headline" className="list-group-item">
                            {friend.headline}
                        </li>
                        <li id="status" className="list-group-item">
                            {friend.statusId}
                        </li>
                        <li id="slug" className="list-group-item">
                            {friend.slug}
                        </li>
                    </ul>
                    <div className="card-body">
                        <button
                            id="edit-card"
                            type="button"
                            className="btn btn-outline-secondary mr-2 edit"
                            value={friend}
                            name="EditFriend"
                            onClick={e => editFunc(e, props.friend)}
                        >
                            Edit
                        </button>
                        <button
                            id="delete-card"
                            type="submit"
                            className="btn btn-outline-danger delete"
                            value="delete"
                            onClick={e => deleteFunc(e, itemKey)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FriendCard;
