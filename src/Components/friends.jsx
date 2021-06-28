import React from "react"
import * as userService from "../services/userService"
import SingleFriend from "../Components/singlefriend"

class Friends extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mappedFriends: []
        }
    }

    componentDidMount() {
        userService.friendsCall().then(this.onGetFriendsSuccess).catch(this.onClickError)
    }

    onGetFriendsSuccess = (response) => {
        console.log("Checking data...", response.data.item.pagedItems);
        let result = response.data.item.pagedItems;
        this.setState(() => {
            return {
                mappedFriends: result.map(this.mapFriends)
            };
        })
    }

    onClickError = () => {
        console.log("Hey, what happened?")
    }

    onEditClicked = (friend) => {
        console.log(friend, "EDIT CLICKED")
        this.props.history.push(`/friends/${friend.id}/edit`, { type: "EDIT_FRIEND", payload: friend })
    }

    onDeleteClicked = (id) => {
        console.log("DELETE CLICKED")
        userService.removePerson(id)
            .then(this.onRemovePerson)
            .catch(this.onClickError)
    }

    onRemovePerson = (friend) => {
        this.setState((prevState) => {
            const indexOfPerson = prevState.mappedFriends.findIndex(oneFriend =>
                oneFriend.id === friend.id);

            const copyOfState = [...prevState.mappedFriends];

            if (indexOfPerson >= 0) {
                copyOfState.splice(indexOfPerson, 1);
            }
            console.log("YOUR PALS ARE BEING DELETED");
            return { mappedFriends: copyOfState }
        })
    }

    onAddClicked = () => {
        this.props.history.push('/friends/new');
    }

    mapFriends = (myFriend) => {

        return <SingleFriend key={`This ID: ${myFriend.id}`}
            friend={myFriend}
            editPerson={this.onEditClicked}
            deletePerson={this.onDeleteClicked}></SingleFriend>
    }

    render() {
        return <div className="col-3 p-5">
            <h1>Friends!</h1>
            <button onClick={this.onAddClicked}>+ADD FRIEND+</button>
            <div className="row">
                {this.state.mappedFriends}
            </div>
        </div>
    }

}

export default Friends;