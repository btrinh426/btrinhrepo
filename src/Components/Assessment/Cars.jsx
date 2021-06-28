import React from "react";

class Cars extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: true,
			carsData: [
				{
					make: "Kia",
					model: "Sorento",
					year: 2020,
					id: 1,
				},
				{
					make: "Kia",
					model: "Optima",
					year: 2019,
					id: 2,
				},
				{
					make: "Tesla",
					model: "Model 3",
					year: 2021,
					id: 3,
				},
				{
					make: "Honda",
					model: "Civic",
					year: 2019,
					id: 4,
				},
				{
					make: "Honda",
					model: "Accord",
					year: 2018,
					id: 5,
				},
				{
					make: "Volkswagen",
					model: "Jetta",
					year: 2021,
					id: 14,
				},
				{
					make: "Toyota",
					model: "Camry",
					year: 2021,
					id: 13,
				},
				{
					make: "Ford",
					model: "Mustang",
					year: 2019,
					id: 17,
				},
				{
					make: "Ford",
					model: "F-150",
					year: 2019,
					id: 18,
				},
				{
					make: "Toyota",
					model: "Camry",
					year: 2020,
					id: 19,
				},
				{
					make: "Ford",
					model: "F-150",
					year: 2021,
					id: 10,
				},
			],
		};
	}

	filterCar = (year) => {
		let result = false;
		let car = { ...this.state };

		result = car.year === true;

		return result;
	};

	// showClicked = () => {
	// 	// <button onClick={() => this.setState({showing:false})}>Show Cars</button>
	// // broken^ (didn't use.)

	mapCar = (oneCar) => {
		return (
			<React.Fragment key={`carYear-${oneCar.id}`}>
				<div className="card col-md-3 m-1">
					<div className="card-body">
						<h5 className="card-title">{oneCar.make}</h5>
						<h5 className="card-text">{oneCar.model}</h5>
						<h5 className="card-text">{oneCar.year}</h5>
					</div>
				</div>
			</React.Fragment>
		);
	};

	handleShow = () => {
		this.setState({
			isActive: true,
		});
	};

	handleHide = () => {
		this.setState({
			isActive: false,
		});
	};

	filterCar() {
		let carsData = this.state;
		return (
			<ul>
				{" "}
				Cars by Year:
				{carsData
					.filter((carsData) => carsData.year === true)
					.map((carsData) => (
						<li key={carsData.Id}>{carsData.year}</li>
					))}
			</ul>
		);
	}

	render() {
		// const { showing } = this.state; (didn't use.)
		return (
			<React.Fragment>
				<div>
					{this.state.isActive ? (
						<div>{this.state.carsData.map(this.mapCar)}</div>
					) : null}
					<button onClick={this.handleShow}>Show</button>
					<button onClick={this.handleHide}>Hide</button>
				</div>

				{/* <button
					className="btn btn-primary"
					// onClick={this.showClicked}
					onClick={() => this.setState({showing:false})}>Show Car</button> */}
				{/* (didn't use.) */}

				<div className="dropdown p-3">
					<button
						className="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenuButton1"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Dropdown button
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						<li>
							<a className="dropdown-item" href="null">
								2021
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="null">
								2020
							</a>
						</li>
						<li>
							<a className="dropdown-item" href="null">
								2019
							</a>
						</li>
					</ul>
				</div>
			</React.Fragment>
		);
	}
}

export default Cars;
