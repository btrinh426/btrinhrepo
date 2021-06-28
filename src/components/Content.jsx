import React from "react";

function Content() {

    const handleClick = (e) => {
        console.log(`This button (ID) was clicked:  ${e.currentTarget.id}`);
    }

    return (
        <React.Fragment>
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
                        <button className="btn btn-secondary" id="section1" onClick={handleClick}>
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
                        <button className="btn btn-secondary" id="section2" onClick={handleClick}>
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
                        <button className="btn btn-secondary" id="section3" onClick={handleClick}>
                            View details &raquo;
                        </button>
                        </p>
                    </div>
                </div>
                <hr />
            </div>        
        </React.Fragment>
    );
}

export default Content;