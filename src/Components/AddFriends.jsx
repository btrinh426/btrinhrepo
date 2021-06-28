import React, {Component} from "react";
import { getFriendById, editFriendById, addFriend } from "../services/friendsService";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



class AddFriends extends Component {

    state = {
        formData: {
            title: "",
            bio: "",
            summary: "",
            headline: "",
            slug: "",
            statusId: "",
            skills: "",
            primaryImage: ""
        }

    };

    componentDidMount(){

        let friendId = +this.props.match.params.friendId;

        console.log("mounted", friendId)

        if(friendId) {

            getFriendById(friendId)
                .then(this.onGetFriendByIdSuccess)
                .catch(this.onGetFriendByIdError)            
        }
    };

    onGetFriendByIdSuccess = (res) => {
        console.log("onGetFriendById success", res)

            const {title, bio, summary, headline, slug, statusId, skills, primaryImage} = res.data.item;

            this.setState(() => {
                return {
                    formData: {
                        title: title,
                        bio: bio,
                        summary: summary,
                        headline: headline,
                        slug: slug,
                        statusId: statusId,
                        skills: skills,
                        primaryImage: primaryImage.imageUrl
                    }
                }
            })
    };

    onGetFriendByIdError = (err) => {
        console.log("onGetFriendById error", err.response)
    };

    onFormFieldChanged = (e) => {
        let currentTarget = e.currentTarget
        let newValue = currentTarget.value
        let inputName = currentTarget.name

        this.setState(()=> {
            let formData = {...this.state.formData}

            formData[inputName] = newValue

            return {formData}
        })

    };

    onSubmit = (e) => {
        console.log("submit clicked")
        e.preventDefault()

        let friendId = +this.props.match.params.friendId
        let formData = this.state.formData

        if(friendId){
            editFriendById(friendId, formData)
                .then(this.onEditFriendByIdSuccess)
                .catch(this.onEditFriendByIdError)
        } else {
            addFriend(formData)
                .then(this.onAddFriendSuccess)
                .catch(this.onAddFriendError)
        }

    };

    onEditFriendByIdSuccess = (res) => {
        console.log("onEditFriendById success", res)
        toast.success("Success! You've updated your friend.")
    };

    onEditFriendByIdError = (err) => {
        console.log("onEditFriendById error", err.response)
      
    };

    onAddFriendSuccess = (res) => {
        console.log("onAddFriend success", res)
        toast.success("Success! You've added a friend.")
    };

    onAddFriendError = (err) => {
        console.log("onAddFriend error", err.response)
    };

    render(){
        return(

            <div>
                <div className="page-header">
                    <h3>Add or Edit Friend</h3>
                </div>
                <div className="card" style={{width: "50rem"}}>
                    <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label 
                                htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="title"
                                    value={this.state.formData.title} 
                                    onChange={this.onFormFieldChanged}
                                    id="inputTitle"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputBio" className="col-sm-2 col-form-label">Bio</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="bio"
                                    value={this.state.formData.bio}
                                    onChange={this.onFormFieldChanged}
                                    id="inputBio"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputSummary" className="col-sm-2 col-form-label">Summary</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="summary"
                                    value={this.state.formData.summary}
                                    onChange={this.onFormFieldChanged}
                                    id="inputSummary"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputHeadline" className="col-sm-2 col-form-label">Headline</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="headline"
                                    value={this.state.formData.headline}
                                    onChange={this.onFormFieldChanged}
                                    id="inputHeadline"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputSlug" className="col-sm-2 col-form-label">Slug</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="slug"
                                    value={this.state.formData.slug}
                                    onChange={this.onFormFieldChanged}
                                    id="inputSlug"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputStatus" className="col-sm-2 col-form-label">Status</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="statusId"
                                    value={this.state.formData.statusId}
                                    onChange={this.onFormFieldChanged}
                                    id="inputStatus"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputSkills" className="col-sm-2 col-form-label">Skills</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="skills"
                                    value={this.state.formData.skills}
                                    onChange={this.onFormFieldChanged}
                                    id="inputSkills"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPrimaryImage" className="col-sm-2 col-form-label">Primary Image</label>
                            <div className="col-sm-10">
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    name="primaryImage"
                                    value={this.state.formData.primaryImage}
                                    onChange={this.onFormFieldChanged}
                                    id="inputPrimaryImage"/>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            id="submit-button"
                            onClick={this.onSubmit}
                            >Submit
                        </button>
                    </form>
                    </div>        
                </div>
            </div>
        )
    }
};

export default AddFriends;