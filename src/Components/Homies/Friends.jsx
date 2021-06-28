import React from "react";
import "./HomieStyle/Homies.scss";
import * as friendServices from "../../services/FriendsService";
import FriendCard from "./FriendChilds/FriendCard";
import FriendForm from "./FriendChilds/FriendForm";
import ShowFriends from "./FriendChilds/ShowFriends";
//import debug from "sabio-debug";
//const _logger = debug.extend("Friends");

class Friends extends React.Component {
    state = {
        mappedFriends: [],
        activeuser: true,
        renderFriends: false,
        showForm: false,
        formType: null,
        pageIndex: null,
        totalFriends: null,
        currentUser: {
            firstName: "Jim",
            lastName: "Lopez",
            imageUrl:
                "https://www.jameslopez.xyz/wp-content/uploads/2021/04/Jim.jpg",
        },
    };

    componentDidUpdate() {
        return;
    }
    clickHandler = e => {
        let button = e.currentTarget.name;

        if (button === "showFr") {
            friendServices
                .pagedFriends(0, 3)
                .then(this.onGetFriendsOk)
                .then(this.onGetFriendsFail);
        } else if (button === "addFr") {
            this.props.history.push("/friends/addfriend");
            this.setState({
                showForm: true,
                ShowFriends: false,
                renderFriends: false,
                formType: "Add",
            });
        }
    };

    onGetFriendsOk = res => {
        //console.log(res);
        this.props.history.push("/friends/myfriends");
        const friends = res.data.item.pagedItems.map(this.friendsMap);
        this.setState({
            mappedFriends: friends,
            renderFriends: true,
            showForm: false,
            pageIndex: res.data.item.pageIndex,
            totalFriends: res.data.item.totalCount,
        });
    };

    friendsMap = aFriend => {
        return <FriendCard key={aFriend.id} friend={aFriend} />;
    };
    //onGetFriendsFail = err => console.error(err);

    render() {
        //console.log(this.state.mappedFriends);
        return (
            <div className="container-fluid">
                <div className="greet">
                    <h1 className="greethl">
                        HI THERE {this.state.currentUser.firstName}
                    </h1>
                    <span className="gmess">Lets check out some friends.</span>
                </div>
                <div className="flex-row fOptions">
                    <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                    >
                        <button
                            type="button"
                            className="btn btn-outline-info showB"
                            name="showFr"
                            value={this.state.renderFriends}
                            onClick={this.clickHandler}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-eye"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                            {"  "}
                            Show Friends
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-info showB"
                            name="addFr"
                            onClick={this.clickHandler}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-person-plus"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                <path
                                    fillRule="evenodd"
                                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                                />
                            </svg>
                            {"  "}
                            Add a Friend
                        </button>
                    </div>
                </div>

                {this.state.renderFriends && (
                    <>
                        <div className="friendDisplay">
                            <ShowFriends {...this.state}></ShowFriends>
                        </div>
                    </>
                )}
                {this.state.showForm && (
                    <div>
                        <div className="formDispaly">
                            <FriendForm {...this.state} {...this.props} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Friends;
