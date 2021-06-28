import "./userService";
import * as userService from "./userService";
import Swal from "sweetalert2";

const onSignIn = user => {
    let credentials = user;
    // console.log(user);

    const userData = {
        email: credentials.email,
        password: credentials.password,
        tenantId: "U01R71K7F19",
    };
    console.log("Login Axios Call Sent with", userData);
    userService.logIn(userData).then(onSignInOk).catch(onSignInFail);
};

const onSignInOk = res => {
    console.log(res.config.data);

    let currentUser = res.config.data;
    console.log(currentUser);

    loginSuccess.fire({
        icon: "success",
        title: "Signed in successfully",
    });

    setTimeout(function () {
        window.location.href = "http://localhost:3000/home";
    }, 3000);
};

const onSignInFail = res => {
    console.log(res);
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "<a href>Please check your information and try again.</a>",
    });
};

const regUser = user => {
    console.log(user);
    userService.register(user).then(onRegOk).catch(onRegFail);
};
const onRegOk = res => {
    console.log(res.data);

    regSuccess.fire({
        icon: "success",
        title:
            "You have successfully registered your Happy Place, please log in.",
    });

    setTimeout(function () {
        window.location.href = "http://localhost:3000/Login";
    }, 2000);
};
const onRegFail = res => {
    console.error(res.config);
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "<a href>Please check your information and try again.</a>",
    });
};

const loginSuccess = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const regSuccess = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export { onSignIn, regUser };
