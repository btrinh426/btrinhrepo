import React from "react"
import * as friendService from "../services/friendService";

class Friend extends React.Component
{
    state = {
        formData: { title: "",
                    bio: "",
                    summary: "",
                    headline: "",
                    slug: "",
                    statusId: "",
                    primaryImage: ""
                }
    };

    onFormFieldChange = (e) =>
    {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState(() => {
            let formData = {...this.state.formData};

            formData[inputName] = newValue;

            return {formData};
        });
    }

    onUpdateClicked = (e) =>
    {
        e.preventDefault();

        parseInt(this.state.formData.statusId);

        friendService.add(this.state.formData)
            .then(this.onAddFriendSuccess)
            .catch(this.onAddFriendError);
    }

    onAddFriendSuccess = (response) =>
    {
        console.log(response.data);
    }

    onAddFriendError = (errResponse) =>
    {
        console.log(errResponse.data);
    }

    render() {
        return ( 
                <main role="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 p-5">
                                <div>
                                    <h2 className="text-muted">User Profile</h2>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="title">Title:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="title"
                                            onChange={this.onFormFieldChange} 
                                            placeholder="Enter title"
                                            value={this.state.formData.title} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="bio">Bio:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="bio"
                                            onChange={this.onFormFieldChange} 
                                            placeholder="Enter bio"
                                            value={this.state.formData.bio} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="summary">Summary:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="summary"
                                            onChange={this.onFormFieldChange} 
                                            placeholder="Enter summary"
                                            value={this.state.formData.summary} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="headline">Headline:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="headline"
                                            onChange={this.onFormFieldChange}  
                                            placeholder="Enter headline"
                                            value={this.state.formData.headline}  
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="slug">Slug:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="slug" 
                                            onChange={this.onFormFieldChange} 
                                            placeholder="Enter slug"
                                            value={this.state.formData.slug}  
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="statusId">Status:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="statusId" 
                                            onChange={this.onFormFieldChange} 
                                            placeholder="Enter status" 
                                            value={this.state.formData.statusId}
                                        />
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="skills">Skills:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="skills" 
                                            onChange={this.onFormFieldChange} 
                                            placeholder="Enter status" 
                                            value={this.state.formData.skills}
                                        />
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="primaryImage">Avatar:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="primaryImage" 
                                            onChange={this.onFormFieldChange} 
                                            placeholder="Enter avatar url" 
                                            value={this.state.formData.primaryImage}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        onClick={this.onUpdateClicked}
                                        >
                                            Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>);
    }
}

export default Friend;