import React from "react"


function SingleFriend(props) {

    const friend = props.friend;

    const onFriendClickedFull = () => {
        props.onClick(friend)
    }

    // const onDelete = () => {
    //     props.onClick(friend)
    //     console.log('delete button')
    // }

    return (
        <div className="card m-3">
                <img className="card-img-top w-25 h-25 rounded-circle mx-auto mt-2" src={friend.primaryImage.imageUrl} alt="user profile" />
                <div className="card-body">
                  <h5 className="card-title text-center font-weight-bold">{friend.title}</h5>
                  <p className="card-text text-center">{friend.bio}</p>
                </div>
                <div className="mx-auto pb-4">
                  <button id="editBtn" className="btn btn-primary" onClick={onFriendClickedFull}  data-friend-id={friend.id}>edit</button>
                  <button id="deleteBtn" onClick={props.deleteBtn} className="btn btn-danger" data-friend-id={friend.id}>delete</button>
                </div>
            </div> 
    )
}


export default React.memo(SingleFriend) 