import React from "react"
import * as userService from "../services/userService";

class Content extends React.Component {

    onClickHandler = () => {
        const data = {};

        userService.logIn(data)
            .then(this.onActionSuccess)
            .catch(this.onActionError);

    }

    onActionSuccess = (response) => {

    }

    onActionError = (errResponse) => {

    }

    componentDidMount = () => {
        console.log(this.logIn)
    }

    onClick = () => {
        console.log("button is logging");
    };

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h2>New Button</h2>
                    <p>
                        This is the new button that the directions are asking me to place.
                    </p>
                    <p>
                        <button className="btn btn-secondary" onClick={this.onClick}>
                            Button
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
                </div>
            </div>

            <hr />
        </div>
    }
}

export default Content;