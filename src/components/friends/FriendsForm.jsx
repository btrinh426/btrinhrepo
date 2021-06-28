import React from "react"
import { addFriend, editFriend } from "../../services/friendService"
import { Form, Button } from "react-bootstrap"

class AddFriends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			title: "",
			bio: "",
			summary: "",
			headline: "",
			slug: "",
			statusId: "Active",
			primaryImage: "",
			id: "",
		}
	}
	handleSubmit = () => {
		this.props.location.state ? this.updateFriend() : this.addNewFriend()
	}

	addNewFriend = () => {
		addFriend(this.state).then(this.onSuccess).catch(this.onError)
	}
	updateFriend = () => {
		editFriend(this.state).then(this.onSuccess).catch(this.onError)
	}

	onSuccess = (response) => {
		console.log(response)
		this.props.history.push("/friends")
	}

	onError(response) {
		console.log(response)
	}

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	render() {
		return (
			<>
				<Form.Group className="friendForm">
					<Form.Control
						type="text"
						placeholder="Name"
						name="title"
						value={
							!this.props.location.state
								? this.state.title
								: this.props.location.state.friend.title
						}
						onChange={this.changeHandler}
					/>

					<Form.Control
						type="text"
						placeholder="Bio"
						name="bio"
						value={
							!this.props.location.state
								? this.state.bio
								: this.props.location.state.friend.bio
						}
						onChange={this.changeHandler}
					/>

					<Form.Control
						type="text"
						placeholder="Summary"
						name="summary"
						value={
							!this.props.location.state
								? this.state.summary
								: this.props.location.state.friend.summary
						}
						onChange={this.changeHandler}
					/>

					<Form.Control
						type="text"
						placeholder="Headline"
						name="headline"
						value={
							!this.props.location.state
								? this.state.headline
								: this.props.location.state.friend.headline
						}
						onChange={this.changeHandler}
					/>

					<Form.Control
						type="text"
						placeholder="Slug"
						name="slug"
						value={
							!this.props.location.state
								? this.state.slug
								: this.props.location.state.friend.slug
						}
						onChange={this.changeHandler}
					/>

					<Form.Control
						type="text"
						placeholder="Image"
						name="primaryImage"
						value={
							!this.props.location.state
								? this.state.primaryImage
								: this.props.location.state.friend.primaryImage.imageUrl
						}
						onChange={this.changeHandler}
					/>
					<Button onClick={this.handleSubmit} variant="primary">
						Submit
					</Button>
				</Form.Group>
			</>
		)
	}
}

export default AddFriends
