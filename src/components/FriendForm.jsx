import React from "react";
import friendsService from "../services/friendsService";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"

class FriendForm extends React.Component {

    state = {
        friendData: {
            title: "",
            bio: "",
            summary: "",
            headline: "",
            slug: "",
            statusId: 1,
            primaryImage: ""
        }
    };

    onInputChange = e => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name

        this.setState(() => {
            let friendData = { ...this.state.friendData }
            friendData[inputName] = newValue;

            return { friendData }
        })
    }
    addFriendBtn = e => {
        e.preventDefault();

        const data = { ...this.state.friendData }

        friendsService.addFriend(data)
            .then(this.onAddFriendSuccess)
            .catch(this.onAddFriendError)

    }

    onAddFriendSuccess = response => {
        console.log({ friend: response.data })
        Swal.fire({
            icon: 'success',
            title: 'Awesome!',
            text: 'You have a friend!',
        })

    };

    onAddFriendError = response => {
        console.warn({ error: response })
        Swal.fire({
            icon: 'error',
            title: 'Whoops!',
            text: 'Unable to add friend.',
        })
    };


    render() {
        return <form style={{ margin: "8rem" }}>
            <div className="form-group">
                <label htmlFor="friendTitle">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="friendTitle"
                    name="title"
                    placeholder="Name"
                    onChange={this.onInputChange}
                    value={this.state.friendData.title}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <input
                    type="text"
                    className="form-control"
                    id="friendBio"
                    name="bio"
                    placeholder="Bio"
                    onChange={this.onInputChange}
                    value={this.state.friendData.bio}
                />
            </div>
            <div className="form-group">
                <label htmlFor="summary">Bio Summary:</label>
                <input type="text"
                    className="form-control"
                    id="bioSummary "
                    name="summary"
                    placeholder="Summary"
                    onChange={this.onInputChange}
                    value={this.state.friendData.summary}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cost">Headline:</label>
                <input
                    type="text"
                    className="form-control"
                    id="friendHeadline"
                    name="headline"
                    placeholder="Headline"
                    onChange={this.onInputChange}
                    value={this.state.friendData.headline}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cost">Slug:</label>
                <input
                    type="text"
                    className="form-control"
                    id="slug"
                    name="slug"
                    placeholder="Slug"
                    onChange={this.onInputChange}
                    value={this.state.friendData.slug}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cost">Avatar:</label>
                <input
                    type="text"
                    className="form-control"
                    id="primaryImage"
                    name="primaryImage"
                    placeholder="Image"
                    onChange={this.onInputChange}
                    vale={this.state.friendData.primaryImage}
                />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.addFriendBtn}>Submit</button>
        </form>
    }
};

export default FriendForm;