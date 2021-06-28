import React from "react";

const OneFriendCard = (props) => {
    return (
        <div key={props.id} className="card col-md-2 m-4">
            <img src={props.imgSrc} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <strong>{props.headline}</strong>
                <p className="card-text">{props.summary}</p>
                <div>
                    <button
                        className="btn btn-danger m-1"
                        onClick={props.onDeleteButtonClicked}
                        data-friend-id={props.id}
                    >
                        Delete
                    </button>
                    <button
                        className="btn btn-info m-1"
                        onClick={props.onEditButtonClicked}
                        data-friend-id={props.id}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div >
    )
}


export default React.memo(OneFriendCard);