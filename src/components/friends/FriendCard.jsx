import React from "react"

const FriendCard = (props) => {
	const deletePerson = () => {
		props.handleDelete(props.friend.id)
	}

	const editFriend = () => {
		props.editFriend(props.friend)
	}
	return (
		<div className="card">
			<img
				className="card-img"
				src={
					!props.friend.primaryImage
						? "No Image"
						: props.friend.primaryImage.imageUrl
				}
				alt="Profile"
			/>
			<div className="card-body">
				<h5 className="card-title">{props.friend.title}</h5>
				<p className="card-text">{props.friend.summary}</p>
				<div className="btn btn-secondary" type="submit" onClick={editFriend}>
					Edit
				</div>
				<div className="btn btn-primary" type="submit" onClick={deletePerson}>
					Delete
				</div>
			</div>
		</div>
	)
}

export default FriendCard
