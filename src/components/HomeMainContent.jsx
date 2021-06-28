import React from 'react'
import Misc from "../scripts/misc"
import Services from "../scripts/services"
import EventHandler from "../scripts/eventHandler"
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import FriendsDisplay from './FriendsDisplay';
import FriendAddOrEdit from './FriendAddOrEdit';


class HomeMainContent extends React.Component {

    //Friends state only really needs to come up to here, May be nice to organize Friends into its own component

    componentDidMount () {
        Misc.loginCheck(this.props);
    };

    render(){
         return (
            <React.Fragment>
                <p>Welcome to the site {this.props.getAppState.userCurrentData.data.item.name}</p>

                {
                // Misc.historyToArray(this.props)[1] === "friendsDisplay" || Misc.historyToArray(this.props)[1] === "friendAdd" || Misc.historyToArray(this.props)[1] === "friendEdit" ? 
                // <FriendHandler
                // pushHistory={str => {this.props.history.push(str)}} 
                // getHistory={() => {return this.props.history.location.pathname}}
                // setAppState={p=>{this.setState(p)}}
                // getAppState={this.state}
                // ></FriendHandler>
                // :
                // null

                Misc.historyToArray(this.props)[1] === "friendsDisplay" ? <FriendsDisplay pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} setAppState={this.props.setAppState} getAppState={this.props.getAppState}></FriendsDisplay> :
                Misc.historyToArray(this.props)[1] === "friendAdd" ? <FriendAddOrEdit pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} addOrEdit={"add"} setAppState={this.props.setAppState} getAppState={this.props.getAppState}></FriendAddOrEdit> :
                Misc.historyToArray(this.props)[1] === "friendEdit" ? <FriendAddOrEdit pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} addOrEdit={"edit"} setAppState={this.props.setAppState} getAppState={this.props.getAppState}></FriendAddOrEdit> :
                null
                }
                
            </React.Fragment>

         );
    }
}

export default HomeMainContent;