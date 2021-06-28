import React, {Component} from "react";
import userServices from "../services/userServices";

class Home2 extends Component {
    /*constructor(props) {
        super(props);

        this.state = {
            email: "maurice.g.washington@gmail.com",
            password: "Kyocera6*",
            tenantID: "U01TY0VT466"
        }
    }
    
    componentDidMount()  {
        let payload = this.state

        userServices.login(payload)
            .then(this.loginSuccesfull)
            .catch(this.loginError)

    }

    loginSuccesfull = () => {
        userServices.currentUser()
        .then(this.currentUserSuccess)
        .catch(this.currentUserError)
    }

    loginError = () => {
        console.error("not logged in")
    }

    currentUserSuccess = currentUser => {
        userServices.userId(currentUser.data.item.id)
            .then(this.onCurrentUser)
            .catch(this.grabIdError)
    }

    onCurrentUser = (currentUser) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                name: currentUser.data.item.name,
                id: currentUser.data.item.id
            }
        })
    }
    grabIdError = (err) => {
        console.error(err)
    }

    currentUserError = err => {
        console.error(err)
    }*/
    /*state = {
        formData: {
          name: "",
        },
      };*/
    
      // NOW THIS AUTOMATICALLY GETS THE INFO
      // FROM THE USER LOGGED IN AKA CURRENT USER
      componentDidMount = () => {
        console.log("run");
        userServices.currentUser()
          .then(this.onCurrentUserSuccess)
          .catch(this.onCurrentUserError);
      };
      onCurrentUserSuccess = (response) => {
        console.log(response.data.item.name);
    
        this.setState(() => {
          let formData = { ...this.state.formData };
          formData.name = response.data.item.name;
          console.log(formData);
          return { formData };
        });
      };
      onCurrentUserError = (response) => {
        console.log("fail");
      };
    
    

    render() {

        return (
            <p>Welcome</p>
        )
    }
}

export default Home2