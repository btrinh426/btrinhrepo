import React from "react";

class ToggleBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		
	}
  
	toggleContent() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

		if (opened){
			title ='Hide Vehicles';
		}else{
			title ='Show Vehicles';
		}

		return (
			<div className="box">
				<div className="boxTitle" onClick={this.toggleContent}>
					{title}
				</div>
				{opened && (					
					<div class="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;