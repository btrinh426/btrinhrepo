import React from "react";
import * as userService from "../../services/userService";
import Swal from "sweetalert2";

class Content extends React.Component {
    onClickMe = e => {
        console.log("Thanks for That!!", e);

        const payload = {
            email: "jim@testing.com",
            password: "#sabioTesting2",
            tenantId: "U01R71K7F19",
        };

        userService.logIn(payload).then(this.onLoginOk).catch(this.OnLoginFail);
    };
    onLoginOk = res => {
        Swal.fire({
            title: "You have successfully logged in!",
            text: "Continue",
            icon: "success",
            confirmButtonText: "Cool",
        });
    };
    onLoginFail = res => {
        console.log(res);

        Swal.fire({
            title: "error!",
            text: "Please check your credentials and try again",
            icon: "error",
            confirmButtonText: "Cool",
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>
                                Donec id elit non mi porta gravida at eget
                                metus. Fusce dapibus, tellus ac cursus commodo,
                                tortor mauris condimentum nibh, ut fermentum
                                massa justo sit amet risus. Etiam porta sem
                                malesuada magna mollis euismod. Donec sed odio
                                dui.
                            </p>
                            <p>
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.onClickMe}
                                >
                                    View details &raquo;
                                </button>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>
                                Donec id elit non mi porta gravida at eget
                                metus. Fusce dapibus, tellus ac cursus commodo,
                                tortor mauris condimentum nibh, ut fermentum
                                massa justo sit amet risus. Etiam porta sem
                                malesuada magna mollis euismod. Donec sed odio
                                dui.
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
                                Donec sed odio dui. Cras justo odio, dapibus ac
                                facilisis in, egestas eget quam. Vestibulum id
                                ligula porta felis euismod semper. Fusce
                                dapibus, tellus ac cursus commodo, tortor mauris
                                condimentum nibh, ut fermentum massa justo sit
                                amet risus.
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
                <div className="row justify-content-center clbtn">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg"
                        onClick={this.onClickMe}
                    >
                        Click Me
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default Content;
