import  { toast } from "react-toastify";
import Swal from "sweetalert2";

/**  on xxx fail  template -----------------
const status = err.response.status;
const statusText = err.response.statusText;
const errorList = err.response.data.errors;

const currentPath = this.props.location.pathname;

manageError(status, statusText, errorList, currentPath, nextPath)
--------------------------------------------- */

export const manageError = (status, statusText, errorList, currentPath, nextPath) => {
    console.log("... manageUserRequestFail firing ...");

    let errorTitle = `Request Denied (${status}: ${statusText})`;
    let errorMsg = "Oops! ";
    let isValidPage = (currentPath
        && (typeof currentPath === "string"));
    let canReloadForm = false;

    if (status && statusText && errorList) {

        const unrecognizedMsg = "This particular error is not recognized."
            + " Please contact your administrator for further help. "
        const needAdminMsg = "Contact your administrator to"
            + " get help fixing this one. ";

        // choose path and assemble the message
        status = parseInt(status);

        if (status === 400) {   // bad request

            let resultMsg = errorListParser(errorList);
            errorMsg += resultMsg;

            if (isValidPage) canReloadForm = true;

        }
        else if (status === 401) {    // not authorized

            errorMsg += "Please login for access. ";

        }
        else if (status === 404) {    // not found

            errorMsg += "The requested item could not be found. ";

            if (isValidPage) canReloadForm = true;

        }
//         DELETE
// 405 Method Not Allowed
        else if (status === 415) { // unusupported media type

            errorMsg += needAdminMsg;

            if (isValidPage) canReloadForm = true;

        }
        else if (status === 500) { // internal server error

            if (errorList) {

                if (errorList[0].includes("Cannot insert duplicate key")) {
                    //Cannot insert duplicate key row in object

                    errorMsg += "The Email and Tenant Id entered are already"
                        + " in use. Please use a different Email address for"
                        + " this Tenant Id.";

                    if (isValidPage) canReloadForm = true;

                    // 0: "Generic Error: System.Exception: Invalid Email or Unconfirmed Account

                }
                else if (errorList[0].includes("Invalid Email or Unconfirmed Account")
                    || errorList[0].includes("Invalid Credentials")) {

                    errorTitle = "Login attempt failed";
                    errorMsg = "Please try again";
                    // 0: "Generic Error: System.Exception: Invalid Credentials

                }
                else {    // all other 500 type messages

                    errorMsg += unrecognizedMsg;
                }
            }   // if errorList falsey, message just "Oops! "
        }
        else {    // all other messages triggering error

            errorMsg += unrecognizedMsg;
        }

    } else {    // buffoonery catcher

        console.log("missing elements from manageUserRequestFail invocation");
    }

    // display error and confirm next step from user
    // console.log("REFINED ERROR MSG \n" + errorMsg);
    alertAndOrConfirm(errorTitle, errorMsg, canReloadForm, nextPath);

    
}

var errorListParser = (errorList) => {
    // console.log("... errorListParser firing ...");

    let result = `\n`;

    if (errorList && Array.isArray(errorList)) {

        let count = errorList.length

        for (let index = 0; index < count; index++) {
            const currentError = errorList[index];

            result += `${currentError}\n`
        }
    }
    return result;
}

const  alertAndOrConfirm = (errorTitle, errorMsg, canReloadForm, effectedFormId) => {

    if (canReloadForm) {    // alert and confirm action
        Swal.fire({

            dangerMode: true,
            title: errorTitle,
            text: errorMsg,

            buttons: {
                cancel: "Return to form",
                confirm: "Leave form"
            }

        })
            .then(function (data) {
                console.log("SWAL THEN", data);
                if (data) {
                    // console.log("SWAL THEN CLEARING FORM", effectedFormId);

                    // $(effectedFormId).closest(".card").addClass("d-none");
                    // clearForm(effectedFormId);
                    // onLanding();

                } else {
                    console.log("SWAL THEN DISPLAYING FORM", effectedFormId);

                    // $(effectedFormId).closest(".card").removeClass("d-none");
                }
            })
            .catch(function (err) {
                console.error("SWAL CATCH", err);
                toast.error("SWAL Error", { position: toast.POSITION.TOP_CENTER });
            });


    } else {    // do a toaster general 
        // console.log("... alert ... PUT toastr here as needed", errorTitle);

        toast.error(errorMsg)
    }
}

/**
 *toast("Error", { position: toast.POSITION.TOP_CENTER });
    toast.success("Error", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 8000,
    });
    toast.info("Error", {
      position: toast.POSITION.TOP_LEFT,
      autoClose: false,
    });
    toast.warn("Error", { position: toast.POSITION.BOTTOM_CENTER });
    toast.error("Error", { position: toast.POSITION.BOTTOM_LEFT });
    toast("Error", { position: toast.POSITION.BOTTOM_RIGHT });
 */
export default manageError;