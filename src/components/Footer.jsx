import React from "react";
import * as FaIcons from "react-icons/fa";

class Footer extends React.Component {
  render() {
    return (
      <div className="container col-lg-12 foot">
        <footer>
          <p>
            <FaIcons.FaCopyright /> 2020 - Sabio
          </p>
        </footer>
      </div>
    );
  }
}

export default Footer;
