import React from "react"
import { getCurrent } from "../services/serviceHelper"
import NavComponent from "./navigation"

class Home extends React.Component {
	componentDidMount() {
		getCurrent()
			.then(this.onGetSuccess)

			.catch(this.onGetError)
	}
	onGetSuccess = (response) => {
		console.log(response.data.item)
	}

	onGetError(response) {
		console.log(response)
	}
	render() {
		return <strong>HELLO</strong>
	}
}

export default Home
