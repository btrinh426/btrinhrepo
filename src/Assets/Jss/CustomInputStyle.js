import { dangerColor, successColor, defaultFont } from "../MyMui";

const customInputStyle = {
    disabled: {
        "&:before": {
            borderColor: "transparent !important",
        },
    },
    underline: {
        "&:hover:not($disabled):before,&:before": {
            borderColor: "#61DBFB !important",
            borderWidth: "1px !important",
        },
        "&:after": {
            borderColor: "#32CD32",
        },
    },
    underlineError: {
        "&:after": {
            borderColor: dangerColor,
        },
    },
    underlineSuccess: {
        "&:after": {
            borderColor: successColor,
        },
    },
    whiteUnderline: {
        "&:hover:not($disabled):before,&:before": {
            borderColor: "#FFFFFF",
        },
        "&:after": {
            borderColor: "#FFFFFF",
        },
    },
    labelRoot: {
        ...defaultFont,
        color: "#32CD32 !important",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "1.42857",
        top: "10px",
        letterSpacing: "unset",
        "& + $underline": {
            marginTop: "0px",
        },
    },
    labelRootError: {
        color: dangerColor + " !important",
    },
    labelRootSuccess: {
        color: successColor + " !important",
    },
    formControl: {
        margin: "0 0 17px 0",
        width: 300,
        paddingTop: "27px",
        position: "relative",
        "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
            color: "#4399af",
        },
    },
    input: {
        color: "#80e2fb",
        height: "unset",
        "&,&::placeholder": {
            fontSize: "14px",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: "400",
            lineHeight: "1.42857",
            opacity: "1",
        },
        "&::placeholder": {
            color: "#4399af",
        },
    },
    whiteInput: {
        "&,&::placeholder": {
            color: "#4399af",
            opacity: "1",
        },
    },
};

export default customInputStyle;