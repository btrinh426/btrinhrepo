import React from "react";

class Cars extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			car: [
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

	onFieldChanged = (e) => {
		let currentTarget = e.currentTarget;
		let newValue = currentTarget.value;
		let inputName = currentTarget.name;

		this.setState(() => {
			let car = { ...this.state.car };

			car[inputName] = newValue;
			return { car };
		});
	};

	showClicked = () => {};

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

	render() {
		return (
			<React.Fragment>
				<button
					className="btn btn-primary"
					onClick={this.showClicked}
					type="button"
				>
					Show Cars
				</button>
			</React.Fragment>
		);
	}
}

export default Cars;

