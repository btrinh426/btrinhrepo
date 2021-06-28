import React, {Component} from "react";


class FriendCard extends Component {

    render(){
        return (

            <div className="col-md-4 mb-4 card-friend">
                    <div className="card border-0 shadow">
                        <div className="card-body text-center">
                            <img src={this.props.friend.primaryImage.imageUrl} className="card-img-top" alt="..."/>
                            <h5 className="card-name text-black-50">{this.props.friend.title}</h5>
                            <div className="card-summary text-black-50 custom-padding">{this.props.friend.summary}</div>
                            <button 
                                type="button" 
                                className="btn btn-danger deleteFriend custom"
                                style={{width: "78px", marginRight: "5px", marginTop: "10px"}}
                                onClick={this.props.onDelete}
                                data-friend-id={this.props.friend.id}
                                >Delete
                            </button>
                            <button 
                                type="button" 
                                id="editFriend" 
                                className="btn btn-info editFriend custom"
                                style={{width: "78px", marginLeft: "5px", marginTop: "10px"}}
                                onClick={this.props.onEdit}
                                data-friend-id={this.props.friend.id}
                                >Edit
                            </button>
                        </div>
                    </div>
                </div>


        )
    
    }

}

export default FriendCard;