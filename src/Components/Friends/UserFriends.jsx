import React from "react";
// import * as friendServices from "../../services/friendsService";

import "./Friends.css";

function UserFriends(props) {
    return (
        <React.Fragment>
            <div className="row cards-row justify-content-around">
                <div className="card-deck">
                    <div className="card" style={{ width: "18rem" }}>
                        <img
                            className="friend-pic"
                            src="https://rebrand.ly/4a95t9n"
                            alt="What a mench"
                        ></img>
                        <div id="bodyofcard" className="card-body">
                            <h5 id="title" className="card-title">
                                title
                            </h5>
                            <p id="summary" className="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
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
                                headline
                            </li>
                            <li id="status" className="list-group-item">
                                status
                            </li>
                            <li id="slug" className="list-group-item">
                                slug
                            </li>
                        </ul>
                        <div className="card-body">
                            <button
                                id="edit-card"
                                type="button"
                                className="btn btn-outline-secondary edit"
                            >
                                Edit
                            </button>
                            <button
                                id="delete-card"
                                type="button"
                                className="btn btn-outline-danger delete"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="card" style={{ width: "18rem" }}>
                        <img
                            className="friend-pic"
                            src="https://rebrand.ly/4a95t9n"
                            alt="What a mench"
                        ></img>
                        <div id="bodyofcard" className="card-body">
                            <h5 id="title" className="card-title">
                                title
                            </h5>
                            <p id="summary" className="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
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
                                headline
                            </li>
                            <li id="status" className="list-group-item">
                                status
                            </li>
                            <li id="slug" className="list-group-item">
                                slug
                            </li>
                        </ul>
                        <div className="card-body">
                            <button
                                id="edit-card"
                                type="button"
                                className="btn btn-outline-secondary edit"
                            >
                                Edit
                            </button>
                            <button
                                id="delete-card"
                                type="button"
                                className="btn btn-outline-danger delete"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="card" style={{ width: "18rem" }}>
                        <img
                            className="friend-pic"
                            src="https://rebrand.ly/4a95t9n"
                            alt="What a mench"
                        ></img>
                        <div id="bodyofcard" className="card-body">
                            <h5 id="title" className="card-title">
                                title
                            </h5>
                            <p id="summary" className="card-text">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
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
                                headline
                            </li>
                            <li id="status" className="list-group-item">
                                status
                            </li>
                            <li id="slug" className="list-group-item">
                                slug
                            </li>
                        </ul>
                        <div className="card-body">
                            <button
                                id="edit-card"
                                type="button"
                                className="btn btn-outline-secondary edit"
                            >
                                Edit
                            </button>
                            <button
                                id="delete-card"
                                type="button"
                                className="btn btn-outline-danger delete"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UserFriends;
