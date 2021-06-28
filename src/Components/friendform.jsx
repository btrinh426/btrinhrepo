import React from "react";
import * as userService from "../services/userService"

class FriendForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            bio: "",
            summary: "",
            headline: "",
            slug: "",
            status: 1,
            skills: "",
            primaryImage: ""
        }
    }

    componentDidMount() {
        console.log(this.props.location.state.payload)
        if (this.props.location.state && this.props.location.state.type === "EDIT_FRIEND") {
            this.setState(() => {
                return {
                    title: this.props.location.state.payload.title,
                    bio: this.props.location.state.payload.bio,
                    summary: this.props.location.state.payload.summary,
                    headline: this.props.location.state.payload.headline,
                    slug: this.props.location.state.payload.slug,
                    status: this.props.location.state.payload.status,
                    skills: this.props.location.state.payload.skills,
                    primaryImage: this.props.location.state.payload.primaryImage.imageUrl,
                    id: this.props.location.state.payload.id
                };
            })
        }
        else {
            // return this.state;
        }

    }

    infoChange = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let targetName = currentTarget.name;
        this.setState((prevState) => {
            let formData = { ...prevState };
            formData[targetName] = newValue;
            return formData;
        })
    }

    submitClicked = (e) => {
        e.preventDefault();
        let data = { ...this.state };
        userService.editPerson(data).then(this.onSubmitSuccess).catch(this.onClickError)
    }

    onSubmitSuccess = () => {

        console.log("EDIT COMPLETE")
        this.props.history.push("/friends")
    }

    onClickError = () => {
        console.log("Hey, what happened?")
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h3>Form!</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input className="form-control" type="text" id="title" name="title" onChange={this.infoChange} value={this.state.title}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Bio:</label>
                                <input className="form-control" type="text" id="bio" name="bio" onChange={this.infoChange} value={this.state.bio}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="summary">Summary:</label>
                                <input className="form-control" type="text" id="summary" name="summary" onChange={this.infoChange} value={this.state.summary}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="headline">Headline:</label>
                                <input className="form-control" type="text" id="headline" name="headline" onChange={this.infoChange} value={this.state.headline}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="slug">Slug:</label>
                                <input className="form-control" type="text" id="slug" name="slug" onChange={this.infoChange} value={this.state.slug}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status:</label>
                                <input className="form-control" type="number" id="status" name="status" value={this.state.status} onChange={this.infoChange} placeholder="1"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="skills">Skills:</label>
                                <input className="form-control" type="text" id="skills" name="skills" value={this.state.skills} onChange={this.infoChange}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="primaryImage">Primary Image:</label>
                                <img src={this.state.primaryImage} />
                                <button className="form-control" type="file" id="primaryImage" name="primaryImage">Upload</button>
                            </div>
                            <div>
                                <button onClick={this.submitClicked}>Submit!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>)

    }
}

export default FriendForm