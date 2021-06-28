import React from "react";

class Widget extends React.Component {
	render() {
		return (
    
			<form class="form1">
				<div className="mb-3">
					<label for="userName" className="form-label">
						Name
					</label>
					<input type="text" className="form-control" id="userName1" />
				</div>

				<div className="mb-3">
					<label for="userManufacturer" className="form-label">
						Manufacturer
					</label>
					<input type="text" className="form-control" id="userManufacturer1" />
				</div>

				<div className="mb-3">
					<label for="userDescription" className="form-label">
						Description{" "}
					</label>
					<input type="text" className="form-control" id="userDescription1" />
				</div>

				<div className="mb-3">
					<label for="userCost" className="form-label">
						Cost
					</label>
					<input type="number" className="form-control" id="userCost1" />
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		);
	}
}

export default Widget;
