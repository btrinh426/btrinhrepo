this.setState((prevState) => {
    const indexOfperson = prevState.friendsData.findIndex(
      (singleStorage) => singleStorage.id === deleteFriendId.id
    );

    const updatedPeople = [...prevState.friendsData];

    if (indexOfperson >= 0) {
      updatedPeople.splice(indexOfperson, 1);
    }

    return {
      friendsData: updatedPeople,
      formData: null,
    };
  }, this.stateChanged);




1. Initial Code = {this.state.friendsData && this.state.friendsData.map(this.mapFriend)}

2. Code under ComponentDidMount = this.setState((prevState) => {
      return {mappedFriends:
       prevState.friendsData && prevState.friendsData.map(this.mapFriend),};
    });

3. Code after refactor = {this.state.mappedFriends}