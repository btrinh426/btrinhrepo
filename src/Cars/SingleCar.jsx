// import React from 'react';
// function SingleCar(props) {
//     const oneCar = props.singleCar;
//     return (
//         <div className="card col-md-3 m-1">
//             <div className="card-body">
//                 <h5 className="card-title">{oneCar.make}</h5>
//                 <h5 className="card-text">{oneCar.model}</h5>
//                 <h5 className="card-text">{oneCar.year}</h5>
//             </div>
//         </div>
//       );
//     };
// export default React.memo(SingleCar);

// import React, { Component } from "react";

// class ToggleBox extends React.Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			opened: false,
// 		};
// 		this.toggleBox = this.toggleBox.bind(this);
// 	}
  
// 	toggleBox() {
// 		const { opened } = this.state;
// 		this.setState({
// 			opened: !opened,
// 		});
// 	}
  
// 	render() {
// 		var { title, children } = this.props;
// 		const { opened } = this.state;

// 		if (opened){
// 			title ='Hide Vehicles';
// 		}else{
// 			title ='Show Vehicles';
// 		}

// 		return (
// 			<div className="box">
// 				<div className="boxTitle" onClick={this.toggleBox}>
// 					{title}
// 				</div>
// 				{opened && (					
// 					<div class="boxContent">
// 						{children}
// 					</div>
// 				)}
// 			</div>
// 		);
// 	}
// }

// export default ToggleBox;