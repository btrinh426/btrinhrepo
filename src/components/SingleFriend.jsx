import React from "react"


function SingleFriend(props) {


    // const onFriendClickedFull = () => { 
    //     props.onClick(props.friend)
    // }
      //this is a function as a prop to ref the parent 
        //put props.function in here that needs to be refrenced
    
    const deleteClicked = () => {
      props.onDelete(props.friend)
    }

    const editCLicked = () => {
      props.onEdit(props.friend)
    }

    return (
        <div className="card m-3 col-lg-3" style={{width: "18rem"}}>
                <img className="card-img-top w-25 h-25 rounded-circle mx-auto mt-2" src={props.friend.primaryImage.imageUrl} alt="user profile" />
                <div className="card-body">
                  <h5 className="card-title text-center font-weight-bold">{props.friend.title}</h5>
                  <p className="card-text text-center">{props.friend.bio}</p>
                </div>
                <div className="mx-auto pb-4">
                  <button id="editBtn" className="btn btn-primary" onClick={editCLicked}  data-friend-id={props.friend.id}>edit</button>
                  <button id="deleteBtn" className="btn btn-danger" onClick={deleteClicked} data-friend-id={props.friend.id}>delete</button>
                </div>
            </div> 
    )
}

// puting funciton( ) inside click handler means it will run no matter what
export default SingleFriend