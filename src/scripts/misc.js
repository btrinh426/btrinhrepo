import { toast } from 'react-toastify';

const renderToast = (type, text) => {

    if(type === "success"){
        toast.success(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            });
    }

    if(type === "error"){
        toast.error(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            });
    }
}

const historyToArray = (props) => {
    return props.getHistory().split("/").filter(i => {return i != ""});
}

const historySet = (props, newHistory) => {
    if(props.getHistory() != newHistory){
        props.pushHistory(newHistory);
    }
}

const loginCheck = (props) => {
    const isLoggedIn = props.getAppState.isLoggedIn;
    if(isLoggedIn){
        const pg = historyToArray(props)[0];
        if(pg === "login" || pg === "register"){
            historySet(props, "/home/");
        }
    } else {
        historySet(props, "/login/");
    }
}

const objModify = (propertyName, path, objCopy, value) => {

    let objToModify = objCopy;
    for(let i = 0; i < path.length; i++){
        objToModify = objToModify[path[i]];
    }

    objToModify[propertyName] = value;

    return objCopy;
}

export default {renderToast, historyToArray, historySet, loginCheck, objModify};