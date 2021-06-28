import React from"react";
import {} from "react-router-dom"
import * as UserServices from "../services/AxiosService"


class Home extends React.Component
{

    state={
name:"",
avUrl:"http://www.small-icons.com/stock-icons/small-people/unknown_person.gif"
    }

    componentDidMount() {
        this.getCurrentUser();
      }

    getCurrentUser=()=>
{   
    UserServices.userCurrent()
    .then(this.getCurrentSuccess)
}

getCurrentSuccess=(response)=>{
    // console.log(response.data.item);
    
    let userID=response.data.item.id;
    // console.log(userID);
    UserServices.getUserId(userID)
    .then(this.getIdSuccess)
}

getIdSuccess=(response)=>
{
    // console.log(response.data.item)
    let cname = `${response.data.item.firstName} ${response.data.item.lastName}`
    let userUrl =response.data.item.avatarUrl
   
    this.setState({name:cname})
    this.setState({avUrl:userUrl})
    console.log(this.state.name)
}



render()
{
    
    return(
        <div style={{color:"gray", textAlign:"", float :"",marginRight:"3%", fontSize:"2rem",width: ""}} ><strong>Welcome 
        <br></br>
        {this.state.name}
        </strong>
        </div>       
    
    )
}
}

export default Home;