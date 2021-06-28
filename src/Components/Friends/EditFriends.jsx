import React from "react";
import logo from "./logo.svg";
//import FriendCard from "./FriendCard";

function EditFriend(props) {
    
    let currentFriend = props.appState.display.friendToEdit;

    //console.log(formData);

    return (
        <React.Fragment>
            <div className="container rfCont">
                <div className="container">
                    <form className="row g-3">
                        <div className="col-8-md ffTitle">
                            <img
                                id="tImg"
                                alt=""
                                src={logo}
                                width="100"
                                height="100"
                            />
                            <h4> Edit Your Friends Information </h4>
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor="inputName"
                                className="form-label"
                            ></label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                placeholder={currentFriend.title}
                                onChange={props.formControl} //currentTarget = input
                                value={
                                    props.appState.display.editFriendPayload
                                        .title
                                }
                            ></input>

                            <label htmlFor="bio" className="form-label"></label>
                            <input
                                type="text"
                                id="bio"
                                name="bio"
                                className="form-control"
                                placeholder={currentFriend.bio}
                                onChange={props.formControl} //currentTarget = input
                                value={
                                    props.appState.display.editFriendPayload.bio
                                }
                            ></input>

                            <label
                                htmlFor="summary"
                                className="form-label"
                            ></label>
                            <input
                                type="text"
                                id="summary"
                                name="summary"
                                className="form-control"
                                placeholder={currentFriend.summary}
                                onChange={props.formControl} //currentTarget = input
                                value={
                                    props.appState.display.editFriendPayload
                                        .summary
                                }
                            ></input>

                            <label
                                htmlFor="headline"
                                className="form-label"
                            ></label>
                            <input
                                type="text"
                                id="headline"
                                name="headline"
                                className="form-control"
                                placeholder={currentFriend.headline}
                                onChange={props.formControl} //currentTarget = input
                                value={
                                    props.appState.display.editFriendPayload
                                        .headline
                                }
                            ></input>

                            <label
                                htmlFor="inputImage"
                                className="form-label"
                            ></label>
                            <input
                                type="url"
                                id="primaryImage"
                                name="primaryImage" //check this for functionality
                                className="form-control"
                                placeholder={currentFriend.primaryImage}
                                onChange={props.formControl} //currentTarget = input
                                value={
                                    props.appState.display.editFriendPayload
                                        .primaryImage
                                }
                            ></input>
                            <label
                                htmlFor="inputSlug"
                                className="form-label"
                            ></label>
                            <input
                                type="url"
                                id="slug"
                                name="slug"
                                className="form-control"
                                placeholder={currentFriend.slug}
                                onChange={props.formControl} //currentTarget = input
                                value={
                                    props.appState.display.editFriendPayload
                                        .slug
                                }
                            ></input>
                            <label
                                htmlFor="hiddenStatus"
                                className="form-label"
                            ></label>
                            <input
                                type="text"
                                id="StatusId"
                                name="statusId"
                                className="form-control d-none"
                                onChange={props.formControl} //currentTarget = input
                                value={
                                    props.appState.display.editFriendPayload
                                        .statusId
                                }
                            ></input>
                            <label
                                htmlFor="hiddenId"
                                className="form-label"
                            ></label>
                            <input
                                type="text"
                                id="Id"
                                name="id"
                                className="form-control d-none"
                                onChange={props.formControl} //currentTarget = input
                                value={props.appState.display.friendToEdit.id}
                            ></input>

                            <button
                                type="button"
                                name="AddNewFriend"
                                className="btn btn-primary rfButton"
                                onClick={e =>
                                    props.handler(
                                        e,
                                        props.appState.display.friendToEdit.id
                                    )
                                }
                            >
                                Submit Changes
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card"></div>
            </div>
        </React.Fragment>
    );
}

export default EditFriend;
