import React from "react";

class Footer extends React.Component {
  render() {
    return (
                              //<React.Fragment>  only needed for sibling elements
        <footer className="container text-center">
          <p>&copy; Sabio 2019-2020</p>
        </footer>
                             // </React.Fragment>
    );
  }
}

export default Footer;