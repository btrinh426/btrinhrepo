import React from "react"

import "../App.css"
import { addFriend, getFriends } from "../services/serviceHelper"
import { Formik, Form, Field } from "formik"

class Friends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			user: {
				title: "",
				bio: "",
				summary: "",
				headline: "",
				slug: "",
				statusId: "Active",
				primaryImage: "",
			},

			friends: [],
		}

		this.onGetFriendsSuccess = this.onGetFriendsSuccess.bind(this)
	}
	componentDidMount() {
		getFriends()
			.then(this.onGetFriendsSuccess)
			.catch((response) => console.log(response))
	}

	onGetFriendsSuccess = (response) => {
		this.setState({ friends: response.data.item.pagedItems })
		this.setState(() => {
			return { mappedFriends: this.state.friends.map(this.mapFriends) }
		})
	}

	handleSubmit = (values) => {
		addFriend(values).then(this.onAddFriendSuccess).catch(this.onAddFriendError)
	}
	onAddFriendSuccess(response) {
		console.log(response)
	}

	onAddFriendError(response) {
		console.log(response)
	}

	mapFriends = (oneFriend) => {
		return (
			<div key={"friend " + oneFriend.id} className="card">
				<img
					className="card-img"
					src={oneFriend.primaryImage.imageUrl}
					alt="Profile"
				/>
				<div className="card-body">
					<h5 className="card-title">{oneFriend.title}</h5>
					<p className="card-text">{oneFriend.bio}</p>
					<div className="btn btn-secondary">Edit</div>
					<div className="btn btn-primary">Delete</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<>
				{
					<div className="friendForm">
						<Formik
							enableReinitialize={true}
							initialValues={this.state.user}
							onSubmit={this.handleSubmit}
						>
							<Form>
								<strong>Make a Friend</strong>
								<div className="form-group">
									<Field
										type="text"
										name="title"
										className="form-control"
										placeholder="Name"
									/>
								</div>
								<div className="form-group">
									<Field
										type="text"
										name="bio"
										className="form-control"
										placeholder="Bio"
									/>
								</div>
								<div className="form-group">
									<Field
										type="text"
										name="summary"
										className="form-control"
										placeholder="Summary"
									/>
								</div>
								<div className="form-group">
									<Field
										type="text"
										name="headline"
										className="form-control"
										placeholder="Headline"
									/>
								</div>
								<div className="form-group">
									<Field
										type="text"
										name="slug"
										className="form-control"
										placeholder="Slug"
									/>
								</div>
								<div className="form-group">
									<Field
										type="text"
										name="primaryImage"
										className="form-control"
										placeholder="Image"
									/>
								</div>
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
							</Form>
						</Formik>
					</div>
				}
				<div className="friendCards">{this.state.mappedFriends}</div>
			</>
		)
	}
}

export default Friends
