import React, { Component } from "react"
import FriendCard from "./FriendCard"
import { getFriends } from "../../services/userServices"
// import FriendsForm from "./FriendCard"

class Friends extends Component {

    constructor(props) {
        super(props)
        this.state = {
            friendData: []
        }
    }

    componentDidMount() {
        getFriends().then((response) => {
            this.setState({
                friendData: response.data.item.pagedItems
            })
        })
    }

    renderCards() {
        return this.state.friendData.map((friend, i) => {
            console.log(friend)
            return <FriendCard
                key={i}
                name={friend.title}
                image={friend.primaryImage.imageUrl}
                summary={friend.summary}
                headline={friend.headline}
                bio={friend.bio}
                skills={friend.primaryImage.skills}
                slug={friend.primaryImage.slug}
                statusId={friend.primaryImage.statusId}
                userId={friend.id} 
            />
        })
    }

    render() {
        return (
            <div className="card-group">
                <div className="row">
                    {this.renderCards()}
                </div>
            </div>
        )
    }
}

export default Friends