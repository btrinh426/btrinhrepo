import React from "react";
import * as userService from "../services/userService";

class Content extends React.Component {
    onItemClicked = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const data = { email: "user@google.com", password: "Reactpassword123!", tenantId: "bootcamp2" };
        const payload = data;

        //... code omitted.

        userService.logIn(payload)
            .then(this.onActionSuccess)
            .catch(this.onActionError);
    }
    onActionSuccess = (response) => {
        console.log("I was clicked on", response, new Date());
        // do something
    }

    onActionError = (errResponse) => {
        console.log("There was an error on", errResponse, new Date());
        // do something
    }

    render() {
        return (
            <div className="container">
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
                            <button className="btn btn-secondary">
                                View details &raquo;
                  </button>
                        </p>
                        <div>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={this.onItemClicked}
                            >
                                Click Me
                        </button>
                        </div>

                    </div>
                </div>

                <hr />
            </div>
        )
    }
}

export default Content;