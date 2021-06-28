import React from "react"

import { registerEntity } from "./serviceHelper"

import { toast } from "react-toastify"

class Widget extends React.Component {
	constructor() {
		super()
		this.state = {
			name: "",
			manufacturer: "",
			description: "",
			cost: "",
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	nameHandler = (e) => {
		this.setState({ name: e.target.value })
	}
	manufacturerHandler = (e) => {
		this.setState({ manufacturer: e.target.value })
	}
	descriptionHandler = (e) => {
		this.setState({ description: e.target.value })
	}
	costHandler = (e) => {
		this.setState({ cost: e.target.value })
	}
	handleSubmit = (e) => {
		e.preventDefault()

		registerEntity(this.state)
			.then(this.onSubmitSuccess)
			.catch(this.onSubmitError)
	}

	onSubmitSuccess(response) {
		toast.success("registered entity " + response.data.item)
		console.log(response)
	}
	onSubmitError(response) {
		toast.error("failed")
		console.log(response)
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Register Entity</h1>
				<input type="text" placeholder="name" onChange={this.nameHandler} />
				<input
					type="text"
					placeholder="manufacturer"
					onChange={this.manufacturerHandler}
				/>
				<input
					type="text"
					placeholder="description"
					onChange={this.descriptionHandler}
				/>
				<input type="text" placeholder="cost" onChange={this.costHandler} />
				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default Widget
