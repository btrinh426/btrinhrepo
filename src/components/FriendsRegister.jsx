import React from "react";
import * as friendServices from "../services/friendServices";

class FriendsRegister extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            title: "",
            bio: "",
            summary: "", 
            headline: "",
            slug: "",
            statusId: "Active",
            primaryImage: ""
        };
    };

    changeUserInfo=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        });
    };

    registerFriend=(e)=>{
        e.preventDefault();
        const newFriend = this.state;

        friendServices.register(newFriend)
            .then(this.onRegisterSuccess)
            .catch(this.onRegisterError);
    };

    onRegisterSuccess=(response)=>{
        console.log(response);
        this.state.history.push("/friendsall");
    };

    onRegisterError=(response)=>{
        console.error({"error": response});
    };


    render(){
        return(
            <div className="container" style={{marginTop: "1rem"}}>
                <form className="justify-content-center">
                    <div className="form-group">
                        <label htmlFor="titleName" className="font-weight-bold">Name</label>
                        <input 
                        type="text" 
                        className="form-control"  
                        name="title" 
                        placeholder="First and Last Name"
                        value={this.state.title}
                        onChange={this.changeUserInfo}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio" className="font-weight-bold">Bio</label>
                        <input
                        type="text"
                        className="form-control"
                        name="bio"
                        placeholder="Tell me about yourself"
                        value={this.state.bio}
                        onChange={this.changeUserInfo}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio" className="font-weight-bold">Summary</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="One sentence"
                        name="summary"
                        value={this.state.summary}
                        onChange={this.changeUserInfo}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="roleHeadline" className="font-weight-bold">Role</label>
                        <input
                        type="text"
                        className="form-control"
                        name="headline"
                        placeholder="Headline(Your role)"
                        value={this.state.headline}
                        onChange={this.changeUserInfo}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailAddress" className="font-weight-bold">Email Address</label>
                        <input
                        type="text"
                        className="form-control"
                        name="slug"
                        placeholder="Email Address"
                        value ={this.state.slug}
                        onChange={this.changeUserInfo}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="primaryImage" className="font-weight-bold">Primary Image</label>
                        <input
                        type="text"
                        className="form-control"
                        name="primaryImage"
                        placeholder="An Image Url"
                        value={this.state.primaryImage}
                        onChange={this.changeUserInfo}
                        />
                    </div>
                    {/* <div className="form-group d-none">
                        <label htmlFor="id" className="font-weight-bold"></label>
                        <input
                        type="text"
                        className="form-control"
                        id="hiddenId"
                        name="id"
                        />
                    </div> */}
              </form>
              <button type="button" className="btn btn-primary" form="submitForm" style={{margin: "5px"}} onClick={this.registerFriend}>
                Submit
              </button>
              <button type="button" className="btn btn-primary" form="submitForm">
                Save
              </button>
            </div>
        );
    };
};

export default FriendsRegister;