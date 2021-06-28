import React, { Component } from "react"
import { deleteFriend } from "../../services/userServices"
import { withRouter } from 'react-router-dom';

class FriendCard extends Component {
    constructor(props){
        super(props)
    }

    onDeleteButtonClick(e) {
        deleteFriend(this.props.userId)
    }

    onEditButtonClick(e) {
        this.props.history.push({
            pathname: '/friendsform',
            state: JSON.stringify({ selectedUser: this.props })
          })
    }

    render() {
        console.log(this.props)
        return (
            <div className="card">
                <div className="card-body">
                    <img src={this.props.image} className="card-img-top round"  alt="..." />
                    <h5 className="card-title">{this.props.name}</h5>
                    <p className="card-text">{this.props.headline}</p>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.onEditButtonClick.bind(this)}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={this.onDeleteButtonClick.bind(this)}>Delete</button>
            </div>
        )
    }
}

export default withRouter(FriendCard)
