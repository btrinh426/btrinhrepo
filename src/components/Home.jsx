import React from "react";
// import * as userService from "../services/userServices";

class Home extends React.Component {
    // componentDidMount() {
    //     userService
    //         .getUser()
    //         .then(function (response) { console.log(response.data) })
    //         .catch(function (data) { console.warn(data) })

    //----use in-line function from now on for .then/catch , reference the log in call
    //     userService
    //         .getUserById()
    //         .then(function (response) { console.log(response.data) })
    //         .catch(function (data) { console.warn(data) })
    // }

    // state = {
    //     firstName: "",
    //     lastName: " ",
    // }

    // this.setState(()=>{
    //     let newState={...this.state};

    //     newState[]
    // })

    render() {
        return (
            <React.Fragment>

                <div>ID:  {this.state?.user?.id} </div>
                <div>Name: {this.state?.user?.name} </div>
                <div>Roles: {this.state?.user?.roles} </div>
                <div>TenantId: {this.state?.user?.tenantId} </div>
                <div>SiteId: {this.state?.user?.siteId} </div>




            </React.Fragment >
        )
    }
}

export default Home
