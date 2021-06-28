import React from "react";
import { toast } from "react-toastify";

const FlashSucces = (props) => {
  return (
    <div>
      <button
        onClick={() => toast.success("the title", "the message")}
        type="button"
      >
        Toastr Success
      </button>
    </div>
  );
};

// export default FlashFail;
// const FlashSucces = (props) => {

//   toastr["info"]("Registration Successful!", "Registration");
//   return;
// };

export default FlashSucces;
