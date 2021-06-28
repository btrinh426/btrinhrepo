import React from "react";
import { toast } from "react-toastify";
import * as userService from "../../services/userService"

class CarsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: {
				name: "",
				manufacturer: "",
				description: "",
				cost: "",
			},
		};
	}

	onFormFieldChanged = (e) => {
		let currentTarget = e.currentTarget;
		let newValue = currentTarget.value;
		let inputName = currentTarget.name;

		this.setState(() => {
			let formData = { ...this.state.formData };

			formData[inputName] = newValue;
			return { formData };
		});
	};

	onSubmitClicked = (e) => {
		//make axios call
		e.preventDefault();
		console.log("Submit Sent");
		userService
			.register(this.state.formData)
			.then(this.getSuccess)
			.catch(this.getError);
	};
	getSuccess = (response) => {
		toast("Created"); 
	};
	getError = (response) => {
		toast("Not Created");
	};

	
    render() {
		return (
			<React.Fragment>
				<form>
					<div className="md-3 ">
						<label htmlFor="name" className="form-label"></label>
						<input
							type="text"
							className="form-control"
							id="name1"
							placeholder="Name"
							name="name"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.name}
						/>
					</div>
					<div className="md-3 ">
						<label htmlFor="manufacturer" className="form-label"></label>
						<input
							type="text"
							className="form-control"
							id="manu1"
							placeholder="manufacturer"
							name="manufacturer"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.manufacturer}
						/>
					</div>
					<div className="md-3 ">
						<label htmlFor="description" className="form-label"></label>
						<input
							type="text"
							className="form-control"
							id="description1"
							placeholder="description"
							name="description"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.description}
						/>
					</div>
					<div className="md-3 ">
						<label htmlFor="cost" className="form-label"></label>
						<input
							type="number"
							className="form-control"
							id="cost1"
							placeholder="cost"
							name="cost"
							onChange={this.onFormFieldChanged}
							value={this.state.formData.cost}
						/>
					</div>
				</form>

				<button
					className="btn btn-primary"
					onClick={this.onSubmitClicked}
					type="button"
				>
					Submit
				</button>
			</React.Fragment>
		);
	}
}

export default CarsForm;
