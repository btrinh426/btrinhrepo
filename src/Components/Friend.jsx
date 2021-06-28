import React from "react";
import * as registerUserService from "../services/registerUserService";
import { withRouter } from "react-router-dom";

class Friend extends React.Component {
    state = {
        formData: {
            title: ""
            , bio: ""
            , summary: ""
            , headline: ""
            , slug: ""
            , statusId: "1"
            , skills: ""
            , primaryImage: ""
        },
        isModalOpen: false,
        hasMadeAjax: true,
        arrayOfComp: [],
    }

    friendIdData = this.props.match.params.friendId;

    componentDidMount() {
        console.log("This is my friend Id data", this.friendIdData);
        if (this.friendIdData) {
            registerUserService.getFriendById(this.friendIdData)
                .then(this.onFriendsSuccess)
                .catch(this.onFriendsError)
        }
    }

    onFriendsSuccess = (response) => {
        console.log("These is my friend", response);
        let title = response.data.item.title;
        let bio = response.data.item.bio;
        let summary = response.data.item.summary;
        let headline = response.data.item.headline;
        let slug = response.data.item.slug;
        // let skills = response.data.item.skills;
        let primaryImage = response.data.item.primaryImage.imageUrl;

        this.setState((prevState) => { // use prevState
            var formData = { ...prevState.formData }; // copies the properties from the object so we don't mutate state
            formData.title = title; // newState object has formData property do not mutate state
            formData.bio = bio;
            formData.summary = summary;
            formData.headline = headline;
            formData.slug = slug;
            formData.skills = formData.skills || ""
            formData.primaryImage = primaryImage;
            return { formData }; // returns an object with a property of newState {newState: newState}
        });

    };

    onFriendsError = (error) => {
        console.log("These is not my friend", error);
    };

    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name; //friend

        this.setState(() => {
            let formData = { ...this.state.formData };

            formData[inputName] = newValue;
            console.log({ formData });
            return { formData };
        });
    };

    onSubmitClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(e); //button works
        const payload = { ...this.state.formData }
        console.log(payload);

        if (this.friendIdData) {
            registerUserService.editById(payload, this.friendIdData)
                .then(this.onUpdateFriendSuccess)
                .catch(this.onUpdateFriendError)
        } else {
            registerUserService.addFriend(payload)
                .then(this.onAddFriendSuccess)
                .catch(this.onAddFriendError)
        }
    }

    onUpdateFriendSuccess = (response, id) => {
        console.log("This is my updated friend", response, id);
        this.props.history.push("/friends");

    }

    onUpdateFriendError = (error) => {
        console.log("Friend update error", error);
    }

    onAddFriendSuccess = (response) => {
        console.log("This is my registered friend", response.data);
        this.props.history.push("/friends");

    }

    onAddFriendError = (error) => {
        console.log("This is my registered friend error", error);
    }

    render() {
        return (
            <div className="container p-5">
                <center>
                    <strong className="p-5">
                        <h1>User Profile</h1>
                    </strong>
                </center>
                <form>
                    <div className="form-group row">
                        <label htmlFor="exampleFormControlTitle1" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                id="exampleFormControlTitle1"
                                name="title"
                                aria-describedby="titleHelp"
                                onChange={this.onFormFieldChanged}
                                value={this.state.formData.title}
                            >
                            </input>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label htmlFor="exampleFormControlBio1" className="col-sm-2 col-form-label">Bio</label>
                        <div className="col-sm-8">
                            <textarea className="form-control"
                                id="exampleFormControlBio1"
                                name="bio"
                                rows="4"
                                onChange={this.onFormFieldChanged}
                                value={this.state.formData.bio}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="exampleFormControlSummary1" className="col-sm-2 col-form-label">Summary</label>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                id="exampleFormControlSummary1"
                                name="summary"
                                aria-describedby="summaryHelp"
                                onChange={this.onFormFieldChanged}
                                value={this.state.formData.summary}
                            >
                            </input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="exampleFormControlHeadline1" className="col-sm-2 col-form-label">Headline</label>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                id="exampleFormControlHeadline1"
                                name="headline"
                                aria-describedby="headlineHelp"
                                onChange={this.onFormFieldChanged}
                                value={this.state.formData.headline}
                            >
                            </input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="exampleFormControlSlug1" className="col-sm-2 col-form-label">Slug</label>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                id="exampleFormControlSlug1"
                                name="slug"
                                aria-describedby="slugHelp"
                                onChange={this.onFormFieldChanged}
                                value={this.state.formData.slug}
                            >
                            </input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="exampleFormControlStatus1" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                id="exampleFormControlStatus1"
                                name="status"
                                aria-describedby="statusHelp"
                                onChange={this.onFormFieldChanged}
                                value={this.state.formData.statusId}
                            >
                            </input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="exampleFormControlSkills1" className="col-sm-2 col-form-label">Skills</label>
                        <div className="col-sm-8">
                            <input type="text"
                                className="form-control"
                                id="exampleFormControlSkills1"
                                name="skills"
                                aria-describedby="skillsHelp"
                                onChange={this.onFormFieldChanged}
                                value={this.state.formData.skills}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="exampleFormControlPrimaryImage1" className="col-sm-2 col-form-label">Primary Image</label>
                        <div className="col-sm-8">
                            <input type="url"
                                className="form-control"
                                id="examplePrimaryImage1"
                                name="primaryImage"
                                aria-describedby="primaryImageHelp"
                                onChange={this.onFormFieldChanged}
                                value={this.state.formData.primaryImage}
                            />
                        </div>
                    </div>
                </form>

                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.onSubmitClicked}
                    >
                        Submit
                            </button>
                </div>
            </div >
        )
    }
}

export default withRouter(Friend);