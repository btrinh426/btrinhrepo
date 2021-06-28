import React from "react";
import friendService from "../services/friendService";



class Friends extends React.Component {
    state = {
        friend: 
        {
            title: " ",
            bio: " ",
            summary: " ",
            headline: " ",
            slug: " ",
            statusId: " ",
            primaryImage: " "
        }
    };
    onFriendChanged = (e) => {
        let currentTarget = e.currentTarget;
        let newValue = currentTarget.value;
        let inputName = currentTarget.name;

        this.setState((prevState) => {
            let friend = { ...prevState.friend };
            friend[inputName] = newValue;
            return { friend }
        })
    };

    addNewFriend = () => {
        let payload = {...this.state.friend}

        friendService
            .addFriends(payload)
            .then(this.onPostSuccess)
            .catch(this.onPostError)
    }
    
    
    render(){
        return(
        <div>

        </div>
        )
    }
};

export default Friends 