import React from "react";
import "./HomieStyle/Homies.scss";
import * as friendServices from "../../services/FriendsService";
import FriendCard from "./FriendChilds/FriendCard";
import FriendForm from "./FriendChilds/FriendForm";
import ShowFriends from "./FriendChilds/ShowFriends";

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

    componentDidMount() {}
    clickHandler = e => {
        let button = e.currentTarget.name;

        if (button === "showFr") {
            friendServices
                .getAllFriends(0, 3)
                .then(this.onGetFriendsOk)
                .then(this.onGetFriendsFail);
        } else if (button === "addFr") {
            //console.log(e.currentTarget.name, "click clack");
            this.setState({
                showForm: true,
                ShowFriends: false,
                renderFriends: false,
                formType: "Add",
            });
        }
    };

    onGetFriendsOk = res => {
        console.log(res);

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
                            Show Friends
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-info showB"
                            name="addFr"
                            onClick={this.clickHandler}
                        >
                            Add a Friend
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-info showB"
                        >
                            Edit a Friend
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
                            <FriendForm />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Friends;
