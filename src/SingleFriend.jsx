import React from "react";


function SingleFriend(props)
{
    const friend = props.aPerson;
    function onEditFriend() {
        props.onEdit(friend);
    };
    function onDeleteFriend() {
        props.onDelete(friend);
    };

    return (
        <div className="col-3 pb-5">
            <div className="card">
                <img src={friend.primaryImage.imageUrl} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h6>{friend.title}</h6>
                    {friend.bio}
                </div>
                <div className="card-footer">
                    <button className="btn btn-link" onClick={onEditFriend} data-friend-id={friend.id}>Edit</button>
                    <button className="btn btn-link float-right" onClick={onDeleteFriend} data-friend-id={friend.id}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SingleFriend);