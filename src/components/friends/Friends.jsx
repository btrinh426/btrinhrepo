import React from "react"

import { getFriends, deleteFriend } from "../../services/friendService"

import FriendCard from "./FriendCard"
import SearchFriend from "../search"
import Pages from "../pagination"

class Friends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			friends: [],
			searchTerm: "",
		}
	}

	componentDidMount() {
		getFriends().then(this.onGetFriendsSuccess).catch(this.onGetFriendsError)
	}

	onGetFriendsSuccess = (response) => {
		let friends = response.data.item.pagedItems
		console.log(friends)

		this.setState(() => {
			return {
				friends: friends,
				mappedFriends: friends.map(this.mapFriend),
			}
		})
	}

	onGetFriendsError = (response) => {
		console.log(response)
	}

	editFriend = (friend) => {
		this.props.history.push(`/friends/${friend.id}/edit`, {
			friend,
		})
	}

	mapFriend = (friend) => (
		<FriendCard
			friend={friend}
			key={friend.id}
			handleDelete={this.handleDelete}
			editFriend={this.editFriend}
		/>
	)

	handleDelete = (id) => {
		deleteFriend(id).then(this.onDeleteSuccess).catch(this.onDeleteError)
	}

	onDeleteSuccess = (id) => {
		this.setState((prevState) => {
			const friends = [...prevState.friends]
			let index = friends.findIndex((friend) => {
				return friend.id === id
			})

			if (index > -1) {
				friends.splice(index, 1)
			}
			return {
				friends,
				mappedFriends: friends.map(this.mapFriend),
			}
		})
	}

	onDeleteError = (response) => {
		console.log(response)
	}

	addFriendHandle = () => {
		this.props.history.push("/friends/new")
	}

	searchHandler = (searchTerm) => {
		this.setState({
			searchTerm: searchTerm,
		})
		if (searchTerm !== "") {
			const newFriendsList = this.state.friends.filter((friend) => {
				return Object.values(friend)
					.join(" ")
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			})
			this.setState({ searchResults: newFriendsList })
		} else this.setState({ searchResults: this.state.friends })
	}

	render() {
		return (
			<>
				<SearchFriend
					term={this.state.searchTerm}
					searchKeyword={this.searchHandler}
				></SearchFriend>

				<button className="btn btn-primary" onClick={this.addFriendHandle}>
					Add Friend
				</button>
				<div className="card-deck" style={{ padding: "50px" }}>
					<Pages
						users={this.state.friends}
						searchedUsers={this.state.searchResults}
						mapFriend={this.mapFriend}
					></Pages>
				</div>
				{/* {this.state.searchTerm
					? this.state.searchResults
					: this.state.mappedFriends} */}
			</>
		)
	}
}

export default Friends
