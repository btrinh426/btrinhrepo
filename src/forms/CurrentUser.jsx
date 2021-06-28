import React from "react";
import * as userService from "../services/userService";




class CurrentUser extends React.Component{

    // state = {firstName: "Bruce"};

    state = {  currentUser: {firstName: ""} };


    onCurrentUserClick = (e) =>
    {
        e.preventDefault();
        
       
        
       
       
        userService.currentUser()
        .then(this.onCurrentUserSuccess)
        .catch(this.onCurrentUserError);
        this.props.history.push("/welcome.message")

        

       
    }

    // componentDidMount()
    // {
    //     console.log(this.state, "original");
       
    //     var newState = {...this.state};

    //     console.log(newState, "clone");

    //     newState.firstName = "Clark";

    //     console.log( newState, "new name");

    //     var inspecting = {state: newState};

    //     console.log(inspecting);

    //     this.setState(inspecting);

    //     console.log( this.state, "last step");


    // }


    onCurrentUserSuccess = (response) => { 


        let newName = response.data.item.name;
        

        var newUser = {...this.state.currentUser};


        newUser.firstName = newName;


        var newState = {currentUser: newUser}


        this.setState(newState);


    }
 
    onCurrentUserError= (response) => { console.warn({ error: response }) }

    render(){
        return (
        <React.Fragment>
        <button type="submit" className="btn btn-primary" onClick={this.onCurrentUserClick} >Current User</button>
        <h1 
        name="firstName"
        >
            Welcome {this.state.currentUser.firstName}!
            </h1>
        </React.Fragment>
        );

    }
}

export default CurrentUser;