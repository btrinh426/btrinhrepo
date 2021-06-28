import { login } from "./apiServices.js"

const userLogin = () => {
    let payload = {
      email: "dawn@yahoo.com",
      password: "Password#3",
      tenantId: "U01U45PKVM2",
    };
  
    login(payload)
    .then(onLoginSuccess)
    .catch(onLoginError);
  };
  
  // JTG: should hide login button on NavBar? 
  const onLoginSuccess = () => {
    console.log("logged in");
  };
  
  const onLoginError = () => {
    console.log("could not log in");
  };

// export { logIn, register}; // export all your calls here
export { userLogin };