import React from "react";
import * as Process from "../services/userService";
import { toast } from "react-toastify";
import NavBar from "../components/navbar";


class Home extends React.Component {
    state = {
        name: "",
        id: ""
    };

    componentDidMount = () => {
        Process.usersCurrent().then(this.mountedData).catch(this.unsuccessfulMount)
    }

    mountedData = (currentUser) => {
        Process.usersId(currentUser.data.item.id).then(this.onCurrentUser).catch(this.unsuccessfulMount)
    }

    unsuccessfulMount = () => console.log("This dog wont hunt")

    onCurrentUser = (currentUser) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                name: currentUser.data.item.firstName,
                id: currentUser.data.item.id
            }
        });
    }

    onLogOutButton = () => {
        Process.usersLogout().then(this.onLogOutSuccess).catch(this.onLogOutError)
    }

    onLogOutSuccess = () => {
        this.props.history.push("/login")
    }

    onLogOutError = () => {
        toast.error("You ain't logged out yet!")
    }

    render() {
        return <React.Fragment>
            <NavBar />
            <div className="container-fluid"><h2>Welcome {this.state.name}!</h2></div>
            <button onClick={this.onLogOutButton}>Log Out?</button>
        </React.Fragment>;
    }
}

export default Home;