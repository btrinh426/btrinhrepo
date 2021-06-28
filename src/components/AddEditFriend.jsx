import React from "react"
import NavBar from "./NavBar"
import * as friendService from "../services/friendService";




class AddEditFriend extends React.Component {

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

    componentDidMount(){
        if(this.props.location.state && this.props.location.state.type ==="UPDATE_FRIEND") {
            let formData = {...this.props.location.state.payload, statusId: 1, primaryImage: this.props.location.state.payload.primaryImage.imageUrl};

                this.setState(()=>{
                    return { formData }
                })
        }

    }

    
    onFormFieldChange = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;
        this.setState( () => {
            let formData = {...this.state.formData};
            formData[inputName] = newValue;
            return { formData }
        })
    }

    onAddFriend = () => {   
        friendService.addFriend(this.state.formData).then(this.addFriendSuccess).catch(this.addFriendError)
    }
    addFriendSuccess = (response) => {
        console.log(response)
        
        Array.from(document.querySelectorAll("input")).forEach(
            (input) => (input.value = "")
        )
        
        
    }
    addFriendError = (response) => console.error(response)


    onUpdateFriend = () => {
        console.log(this.props.match.params.id)
        friendService.updateFriend(this.props.match.params.id, this.state.formData)
            .then(this.updateFriendSuccess)
            .catch(this.updateFriendError)
    }

    updateFriendSuccess = (response) => {
        console.log(response)
        this.props.history.push('/people');
    }
    updateFriendError = (response) => console.error(response)


    

    render() {
        return(
            <React.Fragment>
            <NavBar />
            <div className="w-50 mx-auto shadow p-3 mb-5 mt-5 bg-white rounded">
            <form id="form-content">
                <div>
                    <div className="title mx-auto text-center shadow p-2 mb-5 bg-white rounded">
                        <p>User Profile</p>
                    </div>
                    <div className="form-group mt-5">
                        <label>Title</label>
                        <input type="text" name="title" value={this.state.formData.title} onChange={this.onFormFieldChange} className="form-control" id="friend-title" placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <input type="textarea" className="form-control" value={this.state.formData.bio} onChange={this.onFormFieldChange} name="bio" placeholder="bio"></input>
                      </div>
                    <div className="form-group">
                        <label>Summary</label>
                        <input type="text" className="form-control" value={this.state.formData.summary}  onChange={this.onFormFieldChange} name="summary" id="friendSummary" placeholder="Summary" />                       
                    </div>
                    <div className="form-group">
                        <label>Headline</label>
                        <input type="text" className="form-control" value={this.state.formData.headline} onChange={this.onFormFieldChange} name="headline" id="friendHeadline" placeholder="Headline" />                       
                    </div>
                    <div className="form-group">
                        <label>Slug</label>
                        <input type="text" className="form-control" value={this.state.formData.slug} onChange={this.onFormFieldChange} name="slug" id="friendSlug" placeholder="Slug" />                       
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <input type="text" className="form-control" value={this.state.formData.statusId} onChange={this.onFormFieldChange} name="statusId" id="friendStatus" placeholder="Status" />                       
                    </div>
                    <div className="form-group">
                        <label>Avatar URL</label>
                        <input type="text" className="form-control" value={this.state.formData.primaryImage}  onChange={this.onFormFieldChange} name="primaryImage" id="friendAvatar" placeholder="Avatar" />                       
                    </div>
                    {this.props.location.pathname !== this.props.match.path ? 
                    <button type="button" id="updateButton" onClick={this.onUpdateFriend} className="btn btn-primary">Update</button> :
                    <button type="button" id="submitButton" onClick={this.onAddFriend} className="btn btn-primary">Submit</button>}
                    
                </div>
            </form>
        </div>
        </React.Fragment>
        )
    }
}



export default AddEditFriend;