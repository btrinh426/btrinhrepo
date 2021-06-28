import React from "react";
import { toast } from "react-toastify";
import NavBar from "../components/navbar";
import * as Process from "../services/userService";
// import { toast } from "react-toastify";

class FriendForm extends React.Component {
    state = {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: 1,
        primaryImage: "",
    };

    newDataEntered = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState((prevState) => { return { ...prevState, [name]: value } })
    }

    onSubmitClicked = (e) => {
        e.preventDefault();
        let data = { ...this.state };
        Process.friendsAdd(data).then(this.onClickSuccess).catch(this.onClickError);
    }

    onClickSuccess = () => toast.success("You did it!")

    onClickError = () => toast.error("Oops, something went wrong...")

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="container">
                    <div className="row" />
                    <div className="row">
                        <h3>Enter Your Friend Information, Friend</h3>
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input className="form-control" value={this.state.title} type="text" id="title" name="title" onChange={this.newDataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio:</label>
                            <input className="form-control" value={this.state.bio} type="text" id="bio" name="bio" onChange={this.newDataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="summary">Summary:</label>
                            <input className="form-control" value={this.state.summary} type="text" id="summary" name="summary" onChange={this.newDataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="headline">Headline:</label>
                            <input className="form-control" value={this.state.headline} type="text" id="headline" name="headline" onChange={this.newDataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="slug">Slug:</label>
                            <input className="form-control" value={this.state.slug} type="text" id="slug" name="slug" onChange={this.newDataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="primaryImage">Image:</label>
                            <input className="form-control" value={this.state.primaryImage} type="text" id="primaryImage" name="primaryImage" onChange={this.newDataEntered} />
                            <img src={this.state.primaryImage} />
                        </div>
                        <button onClick={this.onSubmitClicked}>Submit This Information</button>
                    </form>

                </div>
            </React.Fragment>
        );
    }
}

export default FriendForm;