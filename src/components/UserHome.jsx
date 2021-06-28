import React from "react";
import {NavLink} from "react-router-dom";
import * as userServices from "../services/userServices";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class UserHome extends React.Component{
    constructor(props){
        super(props)
        this.state={
            firstName: "",
            lastName: "",
            id: ""
        };
    };

    componentDidMount=()=>{
    
        userServices.current()
            .then(this.onCurrentSuccess)
            .catch(this.onCurrentError);
    };
    
    onCurrentSuccess=(response)=>{
        let currentUserId = response.data.item.id;
        console.log(currentUserId);

        userServices.byId(currentUserId)
            .then(this.onByIdSuccess)
            .catch(this.onByIdError);
    };

    onCurrentError=(response)=>{
        console.error(response);
    };

    onByIdSuccess=(response)=>{
        toast.success(`Welcome ${response.data.item.firstName}`,{hideProgressBar:true});
        this.setState({
           firstName: response.data.item.firstName,
           lastName:  response.data.item.lastName
        });
    };

    onByIdError=(response)=>{
        console.error({"error": response});
    };

    signOut=(e)=>{
        e.preventDefault();

        userServices.logOut()
            .then(this.onLogOutSuccess)
            .catch(this.onLogOutError);
    };
    
    onLogOutSuccess=(response)=>{
        console.log(response);
        toast.success("Logging out, see you soon",{hideProgressBar:true});

        setTimeout(function (){
            window.location.href="/login";}
            , 2000);
    };

    onLogOutError=(response)=>{
        console.error({"error": response});
    };
    
    render(){
        return (
            <ul className="d-flex justify-content-end align-items-start">
                <li className="nav-item align-self-center" style={{"listStyleType":"none", margin:"1 rem"}} >
                    <h5>Welcome {this.state.firstName} {this.state.lastName}</h5>
                </li>
                <li className="nav-item" onClick={this.signOut} style={{"listStyleType":"none", margin:"1rem"}}>
                    <NavLink exact to="/login" className="btn btn-outline-primary">Logout</NavLink>
                </li>
                <li className="nav-item" style={{"listStyleType":"none", margin:"1rem"}}>
                    <NavLink exact to="/form" className="btn btn-outline-primary">Register</NavLink>
                </li>
            </ul>
        )
    }
}

export default UserHome;