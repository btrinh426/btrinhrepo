import Services from "./services"
import Misc from "./misc"

const onItemClick = (e, data) => {
    e.stopPropagation();
    let currentTarget = e.currentTarget;

    if(currentTarget.name === "register-submit-button"){return Services.register(data);}
    if(currentTarget.name === "login-submit-button"){return Services.login(data);}
};

const inputOnChange = (e, path, statePropCopy) => {

    const currentTarget = e.currentTarget;
    const inputName = currentTarget.name;
    const newValue = currentTarget.type === "checkbox" ? currentTarget.checked : currentTarget.value;

    let objToModify = statePropCopy;
    for(let i = 0; i < path.length; i++){
        objToModify = objToModify[path[i]];
    }

    objToModify[inputName] = newValue;

    return statePropCopy;
}

const onLoggedInChange = (isLoggedIn, props) => {
    props.setAppState({... props.getAppState, isLoggedIn});
    isLoggedIn ? Misc.historySet(props, "/home/") : Misc.historySet(props, "/login/");
}

export default {onItemClick, inputOnChange, onLoggedInChange};