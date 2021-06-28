import React from "react";
import { current, logOut, currentById } from "../../services/UserService";
import { toast } from 'react-toastify';
import {Link} from "react-router-dom"


class LoggedIn extends React.Component{
    state={
        userName: "",
    }

    componentDidMount(){
        current()
            .then(this.onCurrentSuccess)
            .catch(this.onCurrentError);
      }
      
    onCurrentSuccess = (response)=>{
        const id = response.data.item.id
        currentById(id)
            .then(this.onCurrentByIdSuccess)
            .catch(this.onCurrentByIdError);
      }
    onCurrentError = (errResponse)=>{
        console.log(errResponse)
      }

    onCurrentByIdSuccess = (response)=>{
        console.log(response)
        let data = response.data.item.firstName
        this.setState((preState) => {
        let newState = {...preState};
        newState.userName = data
        return newState;
        })
      }
    onCurrentByIdError = (errResponse)=>{
        console.log(errResponse)
      }
      
    onButtonClicked3 = () =>{
        logOut()
        .then(this.onLogOutSuccess)
        .catch(this.onLogOutError);
    }
    onLogOutSuccess = (response)=>{
      console.log(response)
      toast.warning("Logged Out", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.history.push('/')
    }
    onLogOutError = (errResponse)=>{
      console.log("No User Found", errResponse)
    }
    
    render(){
        return(
            <div className="container">
            <div style={{ marginLeft: '8rem', padding: '8rem' }}> 
            <h1>Hello {this.state.userName}</h1>
            <h1>LINKS:</h1>
            <div>
            <div>
                <Link to="/Tech"> 
                <button className="btn btn-link">
                    Tech
                </button>
                </Link>
            </div>
            <div>
                <Link to="/Jobs">
                <button className="btn btn-link">
                    Jobs
                </button>
                </Link>
            </div>
            <div>
                <Link to="/Friends">
                <button className="btn btn-link">
                    Friends
                </button>
                </Link>
            </div>
            <div>
                <Link to="/Events">
                <button className="btn btn-link">
                    Events
                </button>
                </Link>
            </div>
            <div>
                <Link to="/Blogs">
                <button className="btn btn-link">
                    Blogs
                </button>
                </Link>
            </div>
            <div>
                <Link to="/Register">
                <button className="btn btn-link">
                    Register
                </button>
                </Link>
            </div>
            </div>
           
            <div style={{ marginTop: '3rem' }}> 
                    <button className="btn btn-secondary" onClick={this.onButtonClicked3}>
                            Logout &raquo;
                    </button>
            </div>         
            </div>
            </div>
           
        )
    }
}
export default LoggedIn;