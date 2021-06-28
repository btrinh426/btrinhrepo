import React from 'react';
import Misc from '../scripts/misc'
import HomeMainContent from './HomeMainContent'
import LoginMainContent from './LoginMainContent'
import RegisterMainContent from './RegisterMainContent'
import JobsHandler from './JobStuffs/JobsHandler'

class MainContent extends React.Component {

    render(){
         return (
            <React.Fragment>
                <div style={{marginTop: '80px'}}>
                    {
                        Misc.historyToArray(this.props)[0] === "home" ? <HomeMainContent pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} setAppState={this.props.setAppState} getAppState={this.props.getAppState}></HomeMainContent> : 
                        Misc.historyToArray(this.props)[0] === "login" ? <LoginMainContent pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} setAppState={this.props.setAppState} getAppState={this.props.getAppState}></LoginMainContent> :
                        Misc.historyToArray(this.props)[0] === "register" ? <RegisterMainContent pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} setAppState={this.props.setAppState} getAppState={this.props.getAppState}></RegisterMainContent> :
                        Misc.historyToArray(this.props)[0] === "jobs" ? <JobsHandler pushHistory={this.props.pushHistory} getHistory={this.props.getHistory} setAppState={this.props.setAppState} getAppState={this.props.getAppState}></JobsHandler> :
                        null
                    }
                </div>
            </React.Fragment>
         );
    }
}

export default MainContent;