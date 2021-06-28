import React from "react";
import "./Home.scss";

const WelcomeUser = props => {
    console.log(props);
    return (
        <>
            <header>
                <h2 className="logo">
                    Welcome back {props.currentUser.firstName}!
                </h2>
                <img
                    className="logo-img"
                    src={props.currentUser.photo}
                    alt=""
                />
            </header>
            <div className="text">
                <h2>Full Stack Developer</h2>
                <h3>California</h3>
                <p>Here to kick ass and chewing bubble gum</p>
                <a href={"mailto:" + props.currentUser.email}>Contact Me</a>
            </div>{" "}
            <ul className="social">
                <li>
                    <a href="https://www.getalife.com/">
                        <img
                            src="https://i.ibb.co/x7P24fL/facebook.png"
                            alt="na"
                        />
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/JLo_727">
                        <img
                            src="https://i.ibb.co/Wnxq2Nq/twitter.png"
                            alt="na"
                        />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/jlo0727/">
                        <img
                            src="https://i.ibb.co/ySwtH4B/instagram.png"
                            alt="na"
                        />
                    </a>
                </li>
            </ul>
        </>
    );
};

export default WelcomeUser;
