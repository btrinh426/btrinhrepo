import React from "react"; 

let SingleFriend = (props) => 
{
  let  onFriendDeleteClick = (e) => 
    {
        e.preventDefault();
        props.onClick(oneFriend)
    };
    const oneFriend = props.friend;
    return (
        <React.Fragment>
        <div className="card w-20"/>
        <img src={oneFriend.primaryImage} className="card-img-top" alt="..."/>
        <div className="card-body"/>
          <h5 className="card-title">{oneFriend.title}</h5>
          <p className="card-text">{oneFriend.bio}</p>
          <button id="delete" className="btn btn-primary delete"
           onClick={onFriendDeleteClick} data-friend-id={oneFriend.id}>Delete</button>
          <button id="edit" className="btn btn-primary edit">Edit</button>
          </React.Fragment>
    )
};

export default React.memo(SingleFriend);