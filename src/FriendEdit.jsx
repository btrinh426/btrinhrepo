import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as friendService from "./services/friendService";

class FriendEdit extends React.Component
{
    state = {
        formData : {
            title: "",
            bio: "",
            summary: "",
            headline: "",
            slug: "",
            statusId: "",
            primaryImage: ""
        },
        formTitle: "Edit Friend Info"
    }

    componentDidMount()
    {
        let id = this.props.match.params.friendId;
        console.log(id);
        friendService.getById(id)
            .then(this.onGetByIdSuccess)
            .catch(this.onGetByIdError);
    }

    onGetByIdSuccess = (response) => {
        let person = response.data.item;
        console.log(person);
        person.primaryImage = person.primaryImage.imageUrl
        this.setState((prevState) => {

            return {...prevState, formData: person};
        });
    }
    onGetByIdError = (error) => {
        console.error(error);
    }


    onFormFieldChanged = (e) =>
    {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(()=>{
            let formData = {...this.state.formData};
            formData[inputName] = newValue;
            return {formData};
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id);
        friendService.update(e.currentTarget.id, this.state.formData)
            .then(this.onUpdateFriendSuccess)
            .catch(this.onUpdateFriendError);
    }

    onUpdateFriendSuccess = (response) => console.log(response);
    onUpdateFriendError = (error) => console.error(error);

    render()
    {
        return(
            <React.Fragment>
                <ToastContainer />
                <div className="container pt-5 pb-5">
                    <form className="card">
                        <div className="card-header text-center">{this.state.formTitle}</div>
                        <div className="form-group row m-3">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Full Name</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="title" 
                                    name="title"
                                    onChange={this.onFormFieldChanged} 
                                    value={this.state.formData.title} />
                            </div>
                        </div>
                        <div className="form-group row m-3">
                            <label htmlFor="bio" className="col-sm-2 col-form-label">Bio</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="bio" 
                                    name="bio"
                                    onChange={this.onFormFieldChanged} 
                                    value={this.state.formData.bio} />
                            </div>
                        </div>
                        <div className="form-group row m-3">
                            <label htmlFor="summary" className="col-sm-2 col-form-label">Summary</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="summary" 
                                    name="summary"
                                    onChange={this.onFormFieldChanged} 
                                    value={this.state.formData.summary} />
                            </div>
                        </div>
                        <div className="form-group row m-3">
                            <label htmlFor="headline" className="col-sm-2 col-form-label">Headline</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="headline" 
                                    name="headline"
                                    onChange={this.onFormFieldChanged} 
                                    value={this.state.formData.headline} />
                            </div>
                        </div>
                        <div className="form-group row m-3">
                            <label htmlFor="slug" className="col-sm-2 col-form-label">Slug</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="slug" 
                                    name="slug"
                                    onChange={this.onFormFieldChanged} 
                                    value={this.state.formData.slug} />
                            </div>
                        </div>
                        <div className="form-group row m-3">
                            <label htmlFor="statusId" className="col-sm-2 col-form-label">Status</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="statusId" 
                                    name="statusId"
                                    onChange={this.onFormFieldChanged} 
                                    value={this.state.formData.statusId} />
                            </div>
                        </div>
                        <div className="form-group row m-3">
                            <label htmlFor="primaryImage" className="col-sm-2 col-form-label">Avatar</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="primaryImage" 
                                    name="primaryImage"
                                    onChange={this.onFormFieldChanged} 
                                    value={this.state.formData.primaryImage} />
                            </div>
                        </div>
                        <div className="form-group row mx-auto">
                            <button className="btn btn-primary" id={this.state.formData.id} onClick={this.submitForm}>Update Info</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default FriendEdit;