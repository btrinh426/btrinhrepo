import React from "react";
import * as userService from "../services/userService";
import Register from "./Register"
import { Route } from "react-router-dom";

class HomePage extends React.Component {
    constructor(props){
        super();

        this.state = {
                formData: { tenantId: "U021HAB3VPW", password:"" }  
        }
    }

    componentDidMount(){
        userService
        .userData()
        .then(this.getSucess)
        .catch(this.getError)
    };

    getSucess =() => {
        console.log("Mount Sucess")
    }

    getError = () => {
        console.log("Mount Failed")
    };

  


	
    render() {
		return (


            <main role="main">
            <div className="col m-3">
                <Route path="/LogOut" exact="true" component={Register}></Route>
                <Route path="/Friends" exact="true" component={Register}></Route>
                <Route path="/Blogs" exact="true" component={Register}></Route>
                <Route path="/TechCompanies" exact="true" component={Register}></Route>
                <Route path="/Jobs" exact="true" component={Register}></Route>
                <Route path="/Register" exact="true" component={Register}></Route>

            </div>
        </main>




        )
	}
}

export default HomePage;