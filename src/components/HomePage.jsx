import React, { Component } from "react"
import { getCurrentUser, getUserInfo, userLogout } from "../services/userServices"; 

class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentUserName: ""
        };
    }

    componentDidMount() {
        getCurrentUser()
            .then((response) => {
                getUserInfo(response.data.item.id)
                    .then((userInfo) => {
                        console.log(userInfo)
                        this.setState({
                            currentUserName: userInfo.data.item.firstName + " " + userInfo.data.item.lastName 
                        })
                    })
            })
    }

    onLogoutButtonClick(e){
        userLogout()
            .then(() => {
                this.props.history.push("/login")
            })
    }


    render() {
        return (
            <div className="col-md-4 offset-md-4">
                <div>
                    <div className="header">
                        <h1>Welcome {this.state.currentUserName}</h1>
                    </div>
                </div>
                <button type="button" className="btn btn-info" onClick={this.onLogoutButtonClick.bind(this)}>Logout</button>
            </div>
        )
    }
}    
    

export default HomePage