import React from "react";

class Home extends React.Component
{
    render()
    {
        return(
            <React.Fragment>
                <div className="container home">
                    <h1 className="home-text">
                        Welcome{(this.props.firstName && this.props.lastName)?
                            `, ${this.props.firstName} ${this.props.lastName}`
                            :""}
                            .</h1>
                            <hr/>
                </div>
            </React.Fragment>
        )
    }
};

export default Home;