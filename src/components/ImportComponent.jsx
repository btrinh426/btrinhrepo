import * as userService from "../Service/userService";

// and within your compoent you can now do something like

onClickHandler = () => {
    const data = {};

    //... code omitted.

    userService.logIn(data)
        .then(this.onActionSuccess)
        .catch(this.onActionError);

}

onActionSuccess = (response) => {
    // do something
}

onActionError = (errResponse) => {
    // do something
}