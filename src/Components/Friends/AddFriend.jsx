import React from "react";
import logo from "./logo.svg";
import "./Friends.css";

function AddFriend(props) {
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
                            <h4> Enter Your Friends Information </h4>
                        </div>
                        <div className="col-md-12">
                            <label
                                htmlFor="inputName"
                                className="form-label"
                            ></label>
                            <input
                                type="text"
                                id="Title"
                                name="title"
                                className="form-control"
                                placeholder="Title"
                                onChange={props.form} //currentTarget = input
                                value={props.fData.title}
                            ></input>

                            <label htmlFor="bio" className="form-label"></label>
                            <input
                                type="text"
                                id="bio"
                                name="bio"
                                className="form-control"
                                placeholder="Brief Biographic"
                                onChange={props.form} //currentTarget = input
                                value={props.fData.bio}
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
                                placeholder="Summary"
                                onChange={props.form} //currentTarget = input
                                value={props.fData.summary}
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
                                placeholder="headline"
                                onChange={props.form} //currentTarget = input
                                value={props.fData.headline}
                            ></input>

                            <label
                                htmlFor="inputImage"
                                className="form-label"
                            ></label>
                            <input
                                type="url"
                                id="avatarUrl"
                                name="primaryImage" //check this for functionality
                                className="form-control"
                                placeholder="Friend Picture Url"
                                onChange={props.form} //currentTarget = input
                                value={props.fData.primaryImage}
                            ></input>
                            <label
                                htmlFor="inputSlug"
                                className="form-label"
                            ></label>
                            <input
                                type="url"
                                id="slug"
                                name="slug" //check this for functionality
                                className="form-control"
                                placeholder="slug Unique"
                                onChange={props.form} //currentTarget = input
                                value={props.fData.slug}
                            ></input>

                            <button
                                type="button"
                                name="AddNewFriend"
                                className="btn btn-primary rfButton"
                                onClick={props.handler}
                            >
                                Add Friend
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddFriend;
