import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import DisplayCars from './DisplayCars';

class Cars extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showing: true,
			cars: [
				{
					make: 'Kia',
					model: 'Sorento',
					year: 2020
				},
				{
					make: 'Kia',
					model: 'Optima',
					year: 2019
				},
				{
					make: 'Tesla',
					model: 'Model 3',
					year: 2021
				},
				{
					make: 'Honda',
					model: 'Civic',
					year: 2019
				},
				{
					make: 'Honda',
					model: 'Accord',
					year: 2018
				},
				{
					make: 'Volkswagen',
					model: 'Jetta',
					year: 2021
				},
				{
					make: 'Toyota',
					model: 'Camry',
					year: 2021
				},
				{
					make: 'Ford',
					model: 'Mustang',
					year: 2019
				},
				{
					make: 'Ford',
					model: 'F-150',
					year: 2019
				},
				{
					make: 'Toyota',
					model: 'Camry',
					year: 2020
				},
				{
					make: 'Ford',
					model: 'F-150',
					year: 2021
				}
			]
		};
	}

	handleChange = (event) => {
		console.log(this.state.cars);
		// const newFilterState = this.state.cars.make.find((option) => option.text === event.target.value);
		// this.setState({
		// 	filterState: newFilterState
		// });
		// console.log(newFilterState);
	};

	render() {
		const { showing } = this.state;
		return (
			<div style={{ padding: '40px' }}>
				<div style={{ display: 'flex' }}>
					<Button
						variant="primary"
						style={{ marginRight: '10px' }}
						onClick={() => this.setState({ showing: !showing })}
					>
						Show Cars
					</Button>
					<select name="" id="" onChange={this.handleChange}>
						<option value="">Show All</option>
						<option value="2021">2021</option>
						<option value="2020">2020</option>
						<option value="2019">2019</option>
					</select>
				</div>
				{showing ? (
					<div className="row row-cols-1 row-cols-md-5 g-4">
						{this.state.cars.map((car) => (
							<div className="card col-md-3 m-3">
								<div className="card-body">
									<h5 className="card-title" name="make">
										{car.make}
									</h5>
									<h5 className="card-text">{car.model}</h5>
									<h5 className="card-text">{car.year}</h5>
								</div>
							</div>
						))}
					</div>
				) : null}
			</div>
		);
	}
}

export default Cars;
