import React from "react";


function SingleFriend (props) {

    const oneFriend = props.formData;


    
    const onFriendClicked = function () {

        props.onClick(oneFriend)
    }


    const onDeleteClicked = function (arr, value) {
            let index = arr.indexOf(value);
            if (index > -1) {
              arr.splice(index, 1);
            }
            return arr;
          }
    // delete needs testing^

    return (

<React.Fragment key={`Friends-${oneFriend.id}`}>
				<div className="card col-md-3">
					<img src={oneFriend.img} class="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">{oneFriend.title}</h5>
						<p className="card-text">{oneFriend.bio}</p>
						<p className="card-text">{oneFriend.summary}</p>
						<p className="card-text">{oneFriend.headline}</p>
						<p className="card-text">{oneFriend.slug}</p>
						<p className="card-text">{oneFriend.status}</p>
						<p className="card-text">{oneFriend.skills}</p>
						<p className="card-text">{oneFriend.img}</p>
						<a href="null" onClick={onFriendClicked} data-friend-id={oneFriend.id} className="btn btn-primary">
							Edit
						</a>
						<a href="null" onClick={onDeleteClicked} data-friend-id={oneFriend.id} className="btn btn-primary">
							Delete
						</a>
					</div>
				</div>
			</React.Fragment>
    )

}




export default  SingleFriend