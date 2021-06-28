import React from 'react'
import Misc from "../../scripts/misc"
import Services from "../../scripts/services"
import EventHandler from "../../scripts/eventHandler"

class FriendAddOrEdit extends React.Component {

    constructor(props) {
        super(props)
        this.onFormChange = this.onFormChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    };

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
    };

    componentDidMount(){
        if(this.props.addOrEdit === "add"){return;}
        if(!this.props.getFriendHandlerState.hasOwnProperty("friendsArray")){return;}
        const friendsArray = this.props.getFriendHandlerState.friendsArray;
        let friend = null;
        const id = Misc.historyToArray(this.props)[2];

        console.log(friendsArray, id);
        friendsArray.forEach(i => {
            if(friend){return;}
            if(i.id == id){friend = i;}
        })

        console.log(friend);
        const formData2 = {
            title: friend.title,
            bio: friend.bio,
            summary: friend.summary,
            headline: friend.headline,
            slug: friend.slug,
            statusId: friend.statusId,
            primaryImage: friend.primaryImage.imageUrl
        }

        this.setState(Misc.objModify("formData", [], {... this.state}, formData2));
    }

    onFormChange(e){
        const newState = EventHandler.inputOnChange(e, ["formData"], {... this.state});
        this.setState(newState);
    }

    onFormSubmit(){
        const payload = {
            title: this.state.formData.title,
            bio: this.state.formData.bio,
            summary: this.state.formData.summary,
            headline: this.state.formData.headline,
            slug: this.state.formData.slug,
            statusId: this.state.formData.statusId,
            primaryImage: this.state.formData.primaryImage
        };

        if(this.props.addOrEdit === "add"){

            Services.friendAdd(payload)
                .then((response)=>{Misc.historySet(this.props, "/home/friendsDisplay/");})
                .catch((response)=>{console.log(response)});

        }


        if(this.props.addOrEdit === "edit"){
            payload.id = Misc.historyToArray(this.props)[2];
            console.log(payload.id);
            Services.friendPut(payload, payload.id)
                .then((response)=>{Misc.historySet(this.props, "/home/friendsDisplay/");})
                .catch((response)=>{console.log(response)});
        }
    }

    render(){
         return (
            <form className="friend-form">

            <p className="friend-form-label">Register a new membership</p>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Title" 
                name="title" 
                onChange={this.onFormChange}
                value={this.state.formData.title}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Biography" 
                name="bio" 
                onChange={this.onFormChange}
                value={this.state.formData.bio}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Summary" 
                name="summary" 
                onChange={this.onFormChange}
                value={this.state.formData.summary}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Headline" 
                name="headline" 
                onChange={this.onFormChange}
                value={this.state.formData.headline}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Slug" 
                name="slug" 
                onChange={this.onFormChange}
                value={this.state.formData.slug}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="statusId" 
                name="statusId" 
                onChange={this.onFormChange}
                value={this.state.formData.statusId}
                />
            </div>

            <div className="form-input">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Primary Image" 
                name="primaryImage" 
                onChange={this.onFormChange}
                value={this.state.formData.primaryImage}
                />
            </div>

            <button 
            name="friend-submit-button" 
            type="button" 
            className="btn btn-primary" 
            onClick={this.onFormSubmit}
            >
            Submit
            </button>

            </form>
         );
    }
}

export default FriendAddOrEdit;