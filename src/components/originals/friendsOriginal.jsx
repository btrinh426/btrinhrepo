import React from "react"
import { Form, Button } from "react-bootstrap"
import "../App.css"
import { addFriend, getFriends } from "../services/serviceHelper"

class Friends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			title: "string",
			bio: "string",
			summary: "string",
			headline: "string",
			slug: "string",
			statusId: "Active",
			primaryImage: "string",
			friends: [],
		}
		this.formChange = this.formChange.bind(this)
		this.handleFriend = this.handleFriend.bind(this)
		this.onGetFriendsSuccess = this.onGetFriendsSuccess.bind(this)
	}
	componentDidMount() {
		getFriends()
			.then(this.onGetFriendsSuccess)
			.catch((response) => console.log(response))
	}

	onGetFriendsSuccess(response) {
		let friends = response.data.item.pagedItems
		this.setState({ friends: friends })
	}

	handleFriend() {
		addFriend(this.state)
			.then(this.onHandleFriendSuccess)
			.catch(this.onHandleFriendError)
	}

	onHandleFriendSuccess(response) {
		console.log(response)
	}

	onHandleFriendError(response) {
		console.log(response)
	}

	formChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	render() {
		return (
			<>
				<div className="friendForm">
					<Form.Group>
						<Form.Control
							type="text"
							onChange={this.formChange}
							placeholder="Name"
							name="title"
						/>
						<br />
						<Form.Control
							type="text"
							placeholder="Bio"
							onChange={this.formChange}
							name="bio"
						/>
						<br />

						<Form.Control
							type="text"
							placeholder="Summary"
							onChange={this.formChange}
							name="summary"
						/>
						<br />
						<Form.Control
							type="text"
							placeholder="Headline"
							onChange={this.formChange}
							name="headline"
						/>
						<br />
						<Form.Control
							type="text"
							placeholder="Slug"
							onChange={this.formChange}
							name="slug"
						/>

						<br />
						<Form.Control
							type="text"
							placeholder="Image"
							onChange={this.formChange}
							name="primaryImage"
						/>
						<br />
						<Button onClick={this.handleFriend} variant="primary">
							Add Friend
						</Button>
					</Form.Group>
				</div>
				<div className="friendDisplay">
					{this.state.friends.map((friend) => (
						<div key={friend.id} className="card">
							<img
								className="card-img"
								src={friend.primaryImage.imageUrl}
								alt="Card image cap"
							/>
							<div className="card-body">
								<h5 className="card-title">{friend.bio}</h5>
								<p className="card-text">{friend.summary}</p>
								<a className="btn btn-secondary"></a>
								<b className="btn btn-primary">Delete</b>
							</div>
						</div>
					))}
				</div>
			</>
		)
	}
}

export default Friends
