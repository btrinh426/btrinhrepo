import React, { Component } from "react"
import { withRouter } from 'react-router-dom';

class FriendsForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedUser: JSON.parse(this.props.location.state).selectedUser,
            // name: "",
            // bio: "",
            // summary: "",
            // headline: "",
            // slug: "",
            // status: "",
            // skills: ""
        }
    }

    onUpdateButtonClick(e) {
        //pass id to userServices update function using this.state.selectedUser...???
    }

    onInputChange (e) {
        const stateObj = {}
        stateObj[e.currentTarget.id] = e.currentTarget.value
        this.setState(stateObj)
    }

    render() {
        console.log(this.state)
        return (
            <form className="col-md-4 offset-md-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" value={this.state.selectedUser.name}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Bio</label>
                    <textarea type="text" className="form-control" row="5" id="bio" aria-describedby="bio" value={this.state.selectedUser.bio}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="summary" className="form-label">Summary</label>
                    <input type="text" className="form-control" id="summary" aria-describedby="summary" value={this.state.selectedUser.summary}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="headline" className="form-label">Headline</label>
                    <input type="text" className="form-control" id="headline" aria-describedby="headline" value={this.state.selectedUser.headline}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Slug</label>
                    <input type="text" className="form-control" id="slug" aria-describedby="slug" value={this.state.selectedUser.slug}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input type="text" className="form-control" id="status" aria-describedby="status" value={this.state.selectedUser.status}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="skills" className="form-label">Skills</label>
                    <input type="text" className="form-control" id="skills" aria-describedby="skills" value={this.state.selectedUser.skills}></input>
                </div>
                <img src={this.state.selectedUser.image} className="card-img-top round"  alt="..." />
                <div className="dropdown-divider"></div>
                <button type="button" className="btn btn-primary">Update</button>
            </form>
        )
    }
}

export default withRouter(FriendsForm)