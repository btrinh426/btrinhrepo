import React from "react";
import "../HomieStyle/Homies.scss";

const FriendForm = props => {
    return (
        <form>
            <div className="form-floating mb-3 frfrm">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                />
                <label htmlFor="floatingInput">Title</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                />
                <label htmlFor="floatingInput">Bio</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                />
                <label htmlFor="floatingInput">Summary</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                />
                <label htmlFor="floatingInput">Headline</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                />
                <label htmlFor="floatingInput">Slug</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                />
                <label htmlFor="floatingInput">Friend Image Url</label>
            </div>
            <div>
                <button className="btn btn-outline-info">Submit</button>
            </div>
        </form>
    );
};

export default FriendForm;
