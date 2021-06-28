import React from 'react'
import Misc from "../scripts/misc"
import Services from "../scripts/services"
import EventHandler from "../scripts/eventHandler"
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import FriendHandler from './FriendStuffs/FriendHandler'


class HomeMainContent extends React.Component {

    //Friends state only really needs to come up to here, May be nice to organize Friends into its own component

    componentDidMount () {
        Misc.loginCheck(this.props);
    };

    render(){
         return (
            <React.Fragment>
                
                <FriendHandler
                pushHistory={this.props.pushHistory} 
                getHistory={this.props.getHistory}
                ></FriendHandler>
                
            </React.Fragment>

         );
    }
}

export default HomeMainContent;