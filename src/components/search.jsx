import React from "react"

class SearchFriend extends React.Component {
	friendSearch = (e) => {
		this.props.searchKeyword(e.target.value)
	}

	render() {
		return (
			<form className="search-friend">
				<input
					className="form-control mr-sm-2"
					type="search"
					placeholder="Search Name"
					aria-label="Search"
					value={this.props.term}
					onChange={this.friendSearch}
				/>
			</form>
		)
	}
}

export default SearchFriend
