import React from "react";
import friendsService from "../services/friendsService";
import Friend from "./Friend";

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css'

class Friends extends React.Component {

    state = {
        friendData: {
            title: "",
            bio: "",
            summary: "",
            headline: "",
            slug: "",
            statusId: 1,
            primaryImage: ""
        },
        mappedFriends: [],
        current: 1,
        pageSize: 2,
        totalCount: 0,
    }

    componentDidMount() {
        this.onPageNumber()
    };

    onPageNumber = () => {
        friendsService.getAllFriends(0, this.state.pageSize)
            .then(this.onGetAllFriendsSuccess)
            .catch(this.onGetAllFriendsError)
    };

    onHandlePagination = page => {
        console.log({ page: page })
        this.setState({ current: page }, () => {
            ///make axios call and map

            friendsService.getAllFriends(this.state.current - 1, this.state.pageSize)
                .then(this.onGetAllFriendsSuccess)
                .catch(this.onGetAllFriendsError)
        })
    };

    onGetAllFriendsSuccess = (response) => {
        // console.log({ allFriends: response.data.item.pagedItems })

        let friends = response.data.item.pagedItems
        let pgSize = response.data.item.pageSize
        let pgIdx = response.data.item.pageIndex

        this.setState(() => {
            return {
                mappedFriends: friends.map(this.mapFriend),
                pageSize: pgSize,
                current: pgIdx + 1,
                totalCount: response.data.item.totalCount
            }
        })
    };

    onInputChange = e => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(() => {
            let friendData = { ...this.state.friendData }
            friendData[inputName] = newValue

            return { friendData }
        })
    };

    onSearchFriend = e => {
        e.preventDefault();
        console.log("On Search Btn Firing")


    };

    onDeleteFriend = friendRemoved => {
        console.log(friendRemoved)
        this.setState(prevState => {

            const indexOfFriend = prevState.mappedFriends.findIndex(friend => friend.id === friendRemoved.id);

            const updatedFriends = [...prevState.mappedFriends];

            if (indexOfFriend >= 0) {
                updatedFriends.splice(indexOfFriend, 1);
            }

            return {
                mappedFriends: updatedFriends,
            }
        }, this.stateChanged) // <-- what does this do/mean?
    };

    onUpdateFriend = friendUpdated => {

    };

    onGetAllFriendsError = err => {
        console.warn(err)
    };

    mapFriend = (friend) => {
        return (
            <Friend friend={friend} key={friend.id} onClick={this.onDeleteFriend} />
        )
    };

    render() {
        return (<React.Fragment>

            <div className="container" style={{ margin: "5rem" }} >

                <section className="search-box" style={{ margin: "1rem" }}>
                    <form className="form-inline my-2 my-lg-0">
                        <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            name="title"
                            onChange={this.onInputChange}
                            value={this.state.friendData.title}
                        />
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                            onClick={this.onSearchFriend}
                        >Search</button>
                    </form>
                </section>

                <Pagination
                    onChange={this.onHandlePagination}
                    current={this.state.current}
                    total={this.state.totalCount}
                    pageSize={this.state.pageSize}
                />

                <div className="row">
                    <div className="card-deck">
                        {this.state.mappedFriends}
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
};

export default Friends 
