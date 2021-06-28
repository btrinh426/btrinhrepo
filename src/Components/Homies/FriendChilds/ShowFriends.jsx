import React from "react";
import * as friendServices from "../../../services/FriendsService";
import Pagination from "rc-pagination";
import FriendCard from "./FriendCard";

import "rc-pagination/assets/index.css";
import "../HomieStyle/Homies.scss";
//import debug from "sabio-debug";
//const _logger = debug.extend("ShowFriends");

class ShowFriends extends React.Component {
    state = {
        current: 0,
        currentFriends: null,
        hideFriends: false,
    };

    componentDidMount() {
        this.setState(prevState => {
            let updateState = { ...prevState };

            updateState.current = this.props.pageIndex;
            updateState.currentFriends = this.props.mappedFriends;
            updateState.totalFriends = this.props.totalFriends;

            return updateState;
        });
    }
    handleClick = e => {
        e.preventDefault();

        const hideFriends = {
            type: "REMOVE_COMPONENT",
            renderFriends: false,
        };

        this.props.history.push("/friends", hideFriends);
    };

    onChange = page => {
        friendServices
            .pagedFriends(page - 1, 3)
            .then(this.onChangePageOk)
            .catch(this.onChangePageFail);

        console.log(page);
        this.setState({
            current: page - 1,
        });
    };

    onChangePageOk = res => {
        const friends = res.data.item.pagedItems.map(this.friendsMap);
        this.setState({
            newFriends: friends,
            totalFriends: res.data.item.totalCount,
            current: res.data.item.pageIndex,
        });
    };
    onChangePageFail = err => console.error(err);

    friendsMap = aFriend => {
        return (
            <FriendCard
                key={aFriend.id}
                friend={aFriend}
                clickHandler={this.props.clickHandler}
            />
        );
    };

    render() {
        return (
            <>
                <Pagination
                    total={this.state.totalFriends}
                    className="paged"
                    pageSize={3}
                    onChange={this.onChange}
                    //current={this.state.current}
                />

                <div className="row row-cols-1 row-cols-md-3 cards-row">
                    {this.state.newFriends
                        ? this.state.newFriends
                        : this.state.currentFriends}
                </div>
            </>
        );
    }
}

export default ShowFriends;
