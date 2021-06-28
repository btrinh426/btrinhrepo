import React from "react";
import * as userService from "../services/userService";

class Widgets extends React.Component {

    onComponentDidMount() {
        userService.getPhones()
            .then(this.onGetPhonesSuccess)
            .catch(this.onGetPhoneError)
    }

    onGetPhonesSuccess = () => {
        console.log("Phones have loaded")
    }

    onGetPhoneError = (response) => {
        console.error("Something went wrong", response)
    }

    render() {

        return (
            <React.Fragment>
                <h1>Navbar</h1>
                <h2 className="p-5">If I have enough time to add the rendering functionality, the cards will populate here.</h2>
            </React.Fragment>
        );
    };
};

export default Widgets;