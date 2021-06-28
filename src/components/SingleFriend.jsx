import React from "react";
import PropTypes from "prop-types"
import debug from "sabio-debug";

const _logger = debug.extend("SingleFriend");



function SingleFriend(props) {

    const oneFriend = props.friend;


    const onEditClick = function () {
        props.onClick(oneFriend);
    };

    const onDeleteClick = function () {
        props.onDeleteRequested(oneFriend)
    }

    _logger("SingleFriend")
    return (
        <div className="card col-sm-3" >
            <img src={oneFriend.primaryImage.imageUrl} className="card-img-top" alt="card-friend" />
            <div className="card-body">
                <h5 className="card-title">{oneFriend.headline}</h5>
            </div>
            <p>
                {oneFriend.summary}
            </p>
            <button type="button" className="btn btn-primary btn-sm" onClick={onEditClick} data-friend-id={oneFriend.id}>Edit</button>
            <button type="button" className="btn btn-danger btn-sm" onClick={onDeleteClick} >Delete</button>
        </div>

    )
}

SingleFriend.propTypes = {
    friend: PropTypes.shape({
        headline: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        primaryImage: PropTypes.shape({
            imageUrl: PropTypes.string.isRequired
        })
    }),
    onClick: PropTypes.func,
    onDeleteRequested: PropTypes.func
}

export default React.memo(SingleFriend);