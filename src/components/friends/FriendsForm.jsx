import React from "react"
import { addFriend, editFriend } from "../../services/friendService"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"

const basicSchema = Yup.object().shape({
	title: Yup.string().required("Is Required"),
	bio: Yup.string().required("Is Required"),
	summary: Yup.string().required("Is Required"),
	headline: Yup.string().required("Is Required"),
	slug: Yup.string().required("Is Required"),
	primaryImageId: Yup.string().required("Is Required"),
})

class AddFriends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			title: this.props.location.state
				? this.props.location.state.friend.title
				: "",
			bio: this.props.location.state
				? this.props.location.state.friend.bio
				: "",
			summary: this.props.location.state
				? this.props.location.state.friend.summary
				: "",
			headline: this.props.location.state
				? this.props.location.state.friend.headline
				: "",
			slug: this.props.location.state
				? this.props.location.state.friend.slug
				: "",
			statusId: this.props.location.state
				? this.props.location.state.friend.statusId
				: "Active",
			primaryImageId: this.props.location.state
				? this.props.location.state.friend.primaryImageId.id
				: "",
			id: this.props.location.state ? this.props.location.state.friend.id : "",
			userId: "test",
		}
	}

	addNewFriend = (values) => {
		addFriend(values).then(this.onSuccess).catch(this.onError)
	}
	updateFriend = (values) => {
		editFriend(values).then(this.onSuccess).catch(this.onError)
	}

	onSuccess = (response) => {
		console.log(response)
		this.props.history.push("/friends")
	}

	onError(response) {
		console.log(response)
	}

	handleSubmit = (values) => {
		this.props.location.state
			? this.updateFriend(values)
			: this.addNewFriend(values)
	}

	render() {
		return (
			<Formik
				enableReinitialize={true}
				initialValues={this.state}
				onSubmit={this.handleSubmit}
				validationSchema={basicSchema}
			>
				<Form className="friendForm">
					<div className="form-group">
						<Field type="text" placeholder="Name" name="title" />
						<ErrorMessage name="title" component="div" />
					</div>
					<div className="form-group">
						<Field type="text" placeholder="Bio" name="bio" />
						<ErrorMessage name="bio" component="div" />
					</div>
					<Field type="text" placeholder="Summary" name="summary" />
					<ErrorMessage name="summary" component="div" />
					<div className="form-group">
						<Field type="text" placeholder="Headline" name="headline" />
						<ErrorMessage name="headline" component="div" />
					</div>
					<div className="form-group">
						<Field type="text" placeholder="Slug" name="slug" />
						<ErrorMessage name="slug" component="div" />
					</div>
					<div className="form-group">
						<Field type="number" placeholder="Image" name="primaryImageId" />
						<ErrorMessage name="primaryImageId" component="div" />
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</Form>
			</Formik>
		)
	}
}

export default AddFriends
