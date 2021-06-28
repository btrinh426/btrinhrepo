import React from "react";
import * as UserService from "../services/userService";

class Content extends React.Component {


    clickedButton = (e) => {
        console.log("Wow!")
        let data = { email: "user@google.com", password: "password", tenantID: "384" };
        UserService.logIn(data)
            .then(this.onActionSuccess)
            .catch(this.onActionError);
    }

    onActionSuccess = (response) => {
        console.log(response);
    }
    onActionError = response => {
        console.log(response);
    }

    componentDidMount = () => {
        this.clickedButton();
    }



    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h2>Heading</h2>
                    <p>
                        Donec id elit non mi porta gravida at eget metus. Fusce
                        dapibus, tellus ac cursus commodo, tortor mauris condimentum
                        nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                        malesuada magna mollis euismod. Donec sed odio dui.
            </p>
                    <p>
                        <button className="btn btn-secondary">
                            View details &raquo;
              </button>
                    </p>
                </div>
                <div className="col-md-4">
                    <h2>Heading</h2>
                    <p>
                        Donec id elit non mi porta gravida at eget metus. Fusce
                        dapibus, tellus ac cursus commodo, tortor mauris condimentum
                        nibh, ut fermentum massa justo sit amet risus. Etiam porta sem
                        malesuada magna mollis euismod. Donec sed odio dui.
            </p>
                    <p>
                        <button className="btn btn-secondary">
                            View details &raquo;
              </button>
                    </p>
                </div>
                <div className="col-md-4">
                    <h2>Heading</h2>
                    <p>
                        Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
                        egestas eget quam. Vestibulum id ligula porta felis euismod
                        semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                        condimentum nibh, ut fermentum massa justo sit amet risus.
            </p>
                    <p>
                        <button className="btn btn-secondary loggedinfo">
                            View details &raquo;
              </button>
                    </p>
                </div>
            </div>
            <button onClick={this.clickedButton}>Click here~!</button>

            <hr />
        </div>;
    }
}

export default Content;