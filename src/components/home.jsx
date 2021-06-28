import React from "react"
import { getCurrent } from "../services/userServices"

class Home extends React.Component {
	state = {
		name: "",

		id: "",
	}

	componentDidMount() {
		getCurrent()
			.then(this.onGetSuccess)

			.catch(this.onGetError)
	}
	onGetSuccess = (response) => {
		this.setState({ name: response.data.item.name, id: response.data.item.id })
		console.log(this.state)
	}

	onGetError = (response) => {
		this.props.history.push("")
		console.log(response)
	}
	render() {
		return (
			<>
				<div className="welcomeMessage">
					<strong>hello </strong>
					{this.state.name}
				</div>
			</>
		)
	}
}

export default Home
