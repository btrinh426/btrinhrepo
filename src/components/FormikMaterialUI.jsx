import React from "react";
import { Formik, Form } from "formik";

class FormikMaterialUI extends React.Component {
    state = {
        formData: {
            fullName: "",
        },
    };
    render(){
        return (
            <h3>Hello from Material</h3>
        )
    }

}

export default FormikMaterialUI;
