import React from "react";
import * as userService from "../services/userService";
import { toast } from "react-toastify";

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            id: ""
        }
    };

    componentDidMount() {
        userService.current()
            .then(this.didMount)
            .catch(this.mountUnsuccessful);
    }

    didMount = (data) => {
        userService.userId(data.data.item.id)
            .then(this.mountedId)
            .catch(this.mountUnsuccessful)
    }

    mountedId = (data) => {
        this.setState(() => {
            return {
                name: data.data.item.firstName,
                id: data.data.item.id
            };

        })
    };



    mountUnsuccessful = () => {
        toast.error("Whoops! No Info!")
    }

    logOutClicked = () => {
        userService.logOut().then(this.logOutSuccessful).catch(this.logOutUnsuccessful)
    }

    logOutSuccessful = () => {
        this.props.history.push("/login")
    }

    logOutUnsuccessful = () => {
        console.log("You haven't logged out yet!")
    }



    render() {
        return <React.Fragment><div className="container-fluid"><h2>Welcome! {this.state.name}</h2>

            <button onClick={this.logOutClicked}>Log Out!</button>

        </div></React.Fragment>;
    };
}

export default Home