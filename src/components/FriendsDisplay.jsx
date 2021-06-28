import React from 'react'
import Misc from "../scripts/misc"
import Services from "../scripts/services"
import "../scripts/CSS/friendsDisplayStyle.css"

class FriendsDisplay extends React.Component {

    constructor(props) {
        super(props)
        this.onGetFriendsSuccess = this.onGetFriendsSuccess.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.onEditClick = this.onEditClick.bind(this)
        this.addFriendClick = this.addFriendClick.bind(this)
    };

    state= {
        friendCards: []
    };

    componentDidMount(){
        if(this.props.getAppState.friendsArray){this.makeCards(this.props.getAppState.friendsArray); return;}
        Services.friendsGet(0, 999)
            .then(this.onGetFriendsSuccess)
            .catch((resp) => {console.log(resp)});
    }

    onGetFriendsSuccess(response){
        const friendsArray = response.data.item.pagedItems;
        this.makeCards(friendsArray);
    }

    makeCards(friendsArray){
        this.props.setAppState(Misc.objModify("friendsArray", [], this.props.getAppState, friendsArray));

        const friendCards = [];
        let uniqueKey = 0;
        friendsArray.forEach(friend => {
            const newCard = this.makeCard(friend.title, friend.summary, friend.primaryImage.imageUrl, friend.id, friend.id);
            const obj = {};
            friendCards.push(newCard);
            uniqueKey+=1;
        });

        this.setState({friendCards: friendCards});
    }

    makeCard(title, text, imgUrl, key, btnId){
        return (<div className="card" style={{width: "18rem"}} key={key}>
                <img className="card-img-top" src={imgUrl} alt="Card image cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{text}</p>
                        <a className="btn btn-primary" onClick={this.onEditClick} id={btnId}>Edit</a>
                        <a className="btn btn-primary" onClick={this.onDeleteClick} id={btnId}>Delete</a>
                    </div>
                </div>);
    }

    onEditClick(e){
        const id = e.currentTarget.id;
        Misc.historySet(this.props, "/home/friendEdit/"+id+"/");
    }

    onDeleteClick(e){
        console.log("DELETE CLICK");
        const id = e.currentTarget.id;
        Services.friendDelete(id)
            .then(() => {
                const stateCopy = {... this.state};
                let i = 0;
                stateCopy.friendCards.forEach(friendCard => {
                    console.log(friendCard.key);
                    if(id === friendCard.key){stateCopy.friendCards.splice(i, 1)}
                    i++;
                })
                this.setState(stateCopy);
            })
            .catch();
    }

    addFriendClick(){
        Misc.historySet(this.props, "/home/friendAdd/");
    }

    render(){
         return (
            <div className="friend-view">
                <div className="friend-cards-container">{this.state.friendCards}</div>
                
                <button 
                type="button" 
                className="btn btn-primary" 
                onClick={this.addFriendClick}
                >
                Add Friend
                </button>
            </div>
         );
    }
}

export default FriendsDisplay;