import React from "react";
import { toast } from "react-toastify";
import NavBar from "../components/navbar";
import * as FriendService from "../services/friendService";

class FriendForm extends React.Component {
    state = {
        title: "",
        bio: "",
        summary: "",
        headline: "",
        slug: "",
        statusId: 1,
        primaryImage: "",
        skills: ""
    };

    componentDidMount = () => {

        let thisPath = this.props.location.state;
        console.log("Look at this!:", thisPath);
        if (thisPath && this.props.location.state.type === "EDIT") {
            this.setState(() => {
                return {
                    title: thisPath.payload.title,
                    bio: thisPath.payload.bio,
                    summary: thisPath.payload.summary,
                    headline: thisPath.payload.headline,
                    slug: thisPath.payload.slug,
                    primaryImage: thisPath.payload.primaryImage.imageUrl,
                    skills: thisPath.payload.skills,
                }
            })
        }
    }

    dataEntered = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState((prevState) => { return { ...prevState, [name]: value } })
    }

    onSubmitClicked = (e) => {
        e.preventDefault();
        let stateData = { ...this.state };
        let propsData = { ...this.props.location.state };
        if (propsData.type && propsData.type === "EDIT") {
            stateData.id = propsData.payload.id;
            FriendService.friendsEdit(stateData).then(this.onClickSuccess).catch(this.onClickError)
        }
        else {
            FriendService.friendsAdd(stateData).then(this.onClickSuccess).catch(this.onClickError)
        }

    }

    onClickSuccess = () => { toast.success("You did it!"); this.props.history.push("/friends") }

    onClickError = (response) => console.log(response)

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="container">
                    <div className="row" />
                    <div className="row p-3">
                        <h3>Enter Your Friend Information, Friend</h3>
                    </div>
                    <hr />
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input className="form-control" value={this.state.title} type="text" id="title" name="title" onChange={this.dataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio">Bio:</label>
                            <input className="form-control" value={this.state.bio} type="text" id="bio" name="bio" onChange={this.dataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="summary">Summary:</label>
                            <input className="form-control" value={this.state.summary} type="text" id="summary" name="summary" onChange={this.dataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="headline">Headline:</label>
                            <input className="form-control" value={this.state.headline} type="text" id="headline" name="headline" onChange={this.dataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills">Skills:</label>
                            <input className="form-control" value={this.state.skills} type="text" id="skills" name="skills" onChange={this.dataEntered} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="slug">Slug:</label>
                            <input className="form-control" value={this.state.slug} type="text" id="slug" name="slug" onChange={this.dataEntered} />
                        </div>
                        <div className="form-gro
                        up">
                            <label htmlFor="primaryImage">Image:</label>
                            <input className="form-control" value={this.state.primaryImage} type="text" id="primaryImage" name="primaryImage" onChange={this.dataEntered} />
                            <img src={this.state.primaryImage} alt="" />
                        </div>
                        <button onClick={this.onSubmitClicked}>Submit This Information</button>
                    </form>

                </div>
            </React.Fragment>
        );
    }
}

export default FriendForm;