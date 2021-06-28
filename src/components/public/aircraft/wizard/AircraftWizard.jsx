import React, { Component } from "react";

// import FaUser from "react-icons/lib/fa/user";
// import FaLock from "react-icons/lib/fa/lock";
// import FaEnvelope from "react-icons/lib/fa/envelope";

import Loki from "react-loki";

import UserForm from "./UserForm";
import ProvDetailsForm from "./ProvDetailsForm";
import PasswordForm from "./PasswordForm";
import NewsletterForm from "./NewsletterForm";

export default class ComplexDemo extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      receiveNewsletter: false,
    },
    provider: {
      phone: "333-444-5555", // test item
      providerDetails: {
        userProfileId: 8,
        titleTypeId: 4,
        genderTypeId: 0,
        phone: "(555) 404-0404",
        fax: "(555) 404-0400",
        networks: "Front end, sent from React",
        npi: 393849473399490,
        genderAccepted: 10,
        isAccepting: false,
      },
      practices: [],
      licenses: [],
      services: [],
    },
  };

  _mergeValues = (values) => {
    console.log("mergeValues", values);
    this.setState({
      provider: {
        ...this.state.provider,
        ...values,
      },
    });
    // this.setState(values);
  };

  goBack = () => {
    //_logger("back button");
    return;
  };

  _finishWizard = () => {
    const data = JSON.stringify(this.state.user);
    alert(`This is your data ${data}`);
  };

  render() {
    const complexSteps = [
      {
        label: "Step 1",
        // icon: <FaUser className="mt-3" />,
        component: <UserForm user={this.state.user} />,
      },
      {
        label: "Step 1.5",
        // icon: <FaUser className="mt-3" />,
        component: (
          <ProvDetailsForm
            providerDetails={this.state.provider.providerDetails}
          />
        ),
      },
      {
        label: "Step 2",
        // icon: <FaLock className="mt-3" />,
        component: <PasswordForm user={this.state.user} />,
      },
      {
        label: "Step 3",
        // icon: <FaEnvelope className="mt-3" />,
        component: <NewsletterForm user={this.state.user} />,
      },
    ];

    return (
      <div className="Demo m-3">
        <Loki
          steps={complexSteps}
          onNext={this._mergeValues}
          onBack={this._goBack}
          onFinish={this._finishWizard}
          noActions
        />
      </div>
    );
  }
}
