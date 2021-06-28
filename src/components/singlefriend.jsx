import React from "react";

const SingleFriend = props => {

    const onEditButtonClicked = function () { props.editPerson(props.friend) }

    const onDeleteButtonClicked = function () { props.deletePerson(props.friend.id) }

    return <div className="card col-md-3">
        <img className="card-img-top" src={props.friend.primaryImage.imageUrl} alt="text" />
        <div className="card-body">
            <h5 className="card-title"><strong>{props.friend.title}</strong></h5>
            <p className="card-text">{props.friend.summary}</p>
            <button className="btn btn-info" onClick={onEditButtonClicked}>Edit Friend Info</button>
            <button className="btn btn-danger" onClick={onDeleteButtonClicked}>Delete Friend :(</button>
        </div>
    </div>

}

export default React.memo(SingleFriend);