import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';

class DisplayCars extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showing: true,
			cars: []
		};
	}

	componentDidMount() {
		const cars = require('./Cars');
		this.setState({ cars: cars });
		console.log(this.state.cars);
	}

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
						<option value="">2020</option>
						<option value="">2019</option>
					</select>
				</div>
				{/* {showing ? (
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
				) : null} */}
			</div>
		);
	}
}

export default DisplayCars;
