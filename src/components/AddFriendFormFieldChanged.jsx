import React from "react";
import * as friendService from "../services/friendService";

class AddFriend extends React.Component {

    state = {
        formData: {
            title: "",
            bio: "",
            summary: "",
            headline: "",
            slug: "",
            statusId: "",
            primaryImage: ""
        }
    }

    componentDidMount() {
        let EditFriendId = this.props.match.params.id; // props pushed on editclick() from friends component. 

        console.log({ EditFriendId });

        //--- payload below is passed on history.push from friends component when edit button is clicked --
        let friend = this.props?.location?.state?.payload;  // optional chain operator (?.) is used here to validate each property . Will return undefined if nullish instead of error

        console.log("FriendPayload:", friend)

        //--- setState will popluate on form
        this.setState((prevState) => {

            let friend = this.props?.location?.state?.payload;  // optional chain operator (?.) is used here to validate each property . Will return undefined if nullish instead of error

            console.log("FriendPayload:", friend)

            if (friend) {

                return {
                    formData: {
                        id: friend.id,
                        title: friend.title,
                        bio: friend.bio,
                        summary: friend.summary,
                        headline: friend.headline,
                        slug: friend.slug,
                        statusId: friend.statusId,
                        primaryImage: friend.primaryImage.imageUrl
                    }
                }
            }

            return {
                formData: {
                    id: null,
                    title: null,
                    bio: null,
                    summary: null,
                    headline: null,
                    slug: null,
                    statusId: null,
                    primaryImage: null
                }
            }

        })

    }


    handleFriends = (e) => {
        e.preventDefault();
        let friendParam = this.props.match.params.id; //props passed if edit button clicked

        if (friendParam) {    // if there is param id in props , execute updateFriend. Expected when onEditClick executes
            friendService.updateFriend(this.state.formData)
                .then(this.onUpdateFriendSuccess)
                .catch(this.onUpdateFriendError)
        } else {             //--else if param is empty obj, execute createFriend
            friendService.createFriend(this.state.formData)
                .then(this.onCreateFriendSuccess)
                .catch(this.onCreateFriendError);
        }
    }

    onUpdateFriendSuccess = (response) => {
        console.log("Update is successful")
    }

    onUpdateFriendError = (errResponse) => {
        console.error("Update error")
    }

    onCreateFriendSuccess = (response) => {
        console.log("Submit is successful")
    }

    onCreateFriendError = (errResponse) => {
        console.error("Submit error")
    }

    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(() => {
            let newState = { ...this.state.formData };

            newState[inputName] = newValue;

            console.log("newState", newState.title, { newState });

            return { formData: newState };
        })
    }

    componentDidUpdate(PrevProps) {
        let currentPath = this.props.location.pathname;
        let previousPath = PrevProps.location.pathname;
        console.log("PrevProps:", PrevProps)
        console.log("Friends", { currentPath, previousPath })
    }

    render() {

        console.log("rendering AddFriend")

        return (

            <div className="col-md-3">
                <form>
                    <h1>Add / Edit Friend</h1>
                    <div className="form-group">
                        <label htmlFor="exampleInputTitle" >
                            Title
                        </label>
                        <input type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.title || ""}
                            placeholder="Ms. Mr. CEO, Cto etc."
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBio" >
                            Bio
                        </label>
                        <input type="text"
                            className="form-control"
                            id="bio"
                            name="bio"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.bio || ""}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputSummary" >
                            Summary
                        </label>
                        <input type="text"
                            className="form-control"
                            id="summary"
                            name="summary"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.summary || ""}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputHeadline" >
                            Headline
                        </label>
                        <input type="text"
                            className="form-control"
                            id="headline"
                            name="headline"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.headline || ""}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputSlug" >
                            Slug
                        </label>
                        <input type="text"
                            className="form-control"
                            id="slug"
                            name="slug"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.slug || ""}
                            placeholder="unique url (http://examplewebsite.com)"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputStatusId" >
                            Status Id
                        </label>
                        <input type="text"
                            className="form-control"
                            id="statusId"
                            name="statusId"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.statusId || ""}
                            placeholder="set Id to 1 or Active to show"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPrimaryImage" >
                            Primary Image
                        </label>
                        <input type="text"
                            className="form-control"
                            id="primaryImage"
                            name="primaryImage"
                            onChange={this.onFormFieldChanged}
                            value={this.state.formData.primaryImage || ""}

                        />
                    </div>

                    <button type="button" className="btn btn-primary" onClick={this.handleFriends}>Submit</button>


                </form>
            </div>
        )
    }


}
export default AddFriend;

