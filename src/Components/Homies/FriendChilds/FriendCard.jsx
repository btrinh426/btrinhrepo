import React from "react";
//import debug from "sabio-debug";
import PropTypes from "prop-types";
import "../HomieStyle/Homies.scss";

//const _logger = debug.extend("FriendCard");

const FriendCard = props => {
    const friend = props.friend;
    console.log("A Friend: ", friend);
    const clickHandler = props.clickHandler;

    return (
        <div className="col mb4 cardCol" align="center">
            <div className="card .h-100 friend-card" style={{ width: "18rem" }}>
                <img
                    className="friend-pic"
                    src={friend.imgUrl || friend.primaryImage.imageUrl}
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
                        type="button"
                        className="btn btn-outline-secondary mr-2 edit"
                        value={friend.id}
                        name="Edit Friend"
                        onClick={clickHandler}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger delete"
                        name="Delete Friend"
                        value={friend.id}
                        onClick={clickHandler}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

FriendCard.propTypes = {
    friend: PropTypes.shape({
        title: PropTypes.string,
        bio: PropTypes.string,
        headline: PropTypes.string,
        summary: PropTypes.string,
        id: PropTypes.number,
        primaryImage: PropTypes.shape({
            id: PropTypes.number,
            imageUrl: PropTypes.string,
            imageType: PropTypes.string,
        }),
        statusId: PropTypes.string,
    }),
    clickHandler: PropTypes.func,
};

export default FriendCard;
