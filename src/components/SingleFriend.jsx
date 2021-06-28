import React from "react";

function SingleFriend(props)
{
    const oneFriend = props.friend;

    const onDeleteClicked = function()
    {
        props.onDelete(oneFriend);
    }

    const onEditClicked = function()
    {
        props.onEdit(oneFriend);
    }

    return (
        <div className="card" style={{ margin: 10 }}>
            <img className="card-img-top" src={oneFriend.primaryImage.imageUrl} style={{ maxWidth: 400 }} alt={`${oneFriend.title}'s avatar`} />
            <div className="card-body">
                <h5 className="card-title">{oneFriend.title}</h5>
                <p className="card-text">{oneFriend.summary}</p>
            </div>
            <footer>
                <button 
                    className="btn btn-warning m-5"
                    onClick={onEditClicked}
                    data-friend-id={oneFriend.id}>Edit</button>
                <button 
                    className="btn btn-danger m-5"
                    onClick={onDeleteClicked}
                    data-friend-id={oneFriend.id}
                    >
                        Delete
                </button>
            </footer>
        </div>
    );
}

export default React.memo(SingleFriend);