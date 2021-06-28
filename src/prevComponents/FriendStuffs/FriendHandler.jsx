import React from 'react'
import Misc from "../../scripts/misc"
import FriendsDisplay from "./FriendsDisplay";
import FriendAddOrEdit from "./FriendAddOrEdit";

class FriendHandler extends React.Component {

    state = {
        friendsArray: undefined
    };

    render(){
         return (
            <React.Fragment>
                {
                    Misc.historyToArray(this.props)[1] === "friendsDisplay" ? <FriendsDisplay pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} getFriendHandlerState={this.state} setFriendHandlerState={p => {this.setState(p)}}></FriendsDisplay> :
                    Misc.historyToArray(this.props)[1] === "friendAdd" ? <FriendAddOrEdit pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} addOrEdit={"add"} getFriendHandlerState={this.state} setFriendHandlerState={p => {this.setState(p)}}></FriendAddOrEdit> :
                    Misc.historyToArray(this.props)[1] === "friendEdit" ? <FriendAddOrEdit pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} addOrEdit={"edit"} getFriendHandlerState={this.state} setFriendHandlerState={p => {this.setState(p)}}></FriendAddOrEdit> :
                    null
                }
            </React.Fragment>
         );
    }
}

export default FriendHandler;