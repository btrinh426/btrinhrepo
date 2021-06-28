import React from "react"
import Content from "./Content"
//import * as userService from "../services/userService"
class Jumbo extends React.Component {
    /*state = {
        userName: ""
    }
    componentDidMount() {
        userService.getCurrentUser().then(onCurrentUserSuccess).catch(onCurrentUserError)
        function onCurrentUserSuccess (res) {
            getUserName(res.data.item.id)
        }
        function onCurrentUserError (res) {
            console.error(res)
        }
        function getUserName (id) {
            userService.getUserNameById(id).then(onUserNameSuccess).catch(onUserNameError)
        }
        function onUserNameSuccess (res) {
            let user = res.data.item
            let userName = user.firstName + " " + user.lastName
            console.log(userName)
            return userName
        }
        function onUserNameError (res) {
            console.error(res)
        }
        this.setState(prevState => {
            let newState = {...prevState}
            newState.userName = onUserNameSuccess()
            console.log(newState)
            return newState
        })
    }*/
    render() {
        return (
            <React.Fragment>
                <main role="main">
                <div className="jumbotron">
                    <div className="container">
                    <h1 className="display-3">Hello World!</h1>    
                            <p>
                                This is a template for a simple marketing or informational
                                website. It includes a large callout called a jumbotron and
                                three supporting pieces of content. Use it as a starting point
                                to create something more unique.
                            </p>
                            <p>
                                <button className="btn btn-primary btn-lg">
                                Learn more &raquo;
                                </button>
                            </p>
                    </div>
                </div>
                <Content />
                </main>
            </React.Fragment>
        )
    }
}

export default Jumbo