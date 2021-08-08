import { Component } from "react";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

class SignupCallback extends Component {
  render() {
    if (!localStorage.getItem("DBIdToken")) {
      localStorage.setItem(
        "DBIdToken",
        this.props.location.pathname.split("/signupcallback/")[1]
      );
      this.props.history.push("/");
    }
    return null;
  }
}
export default connect()(withRouter(SignupCallback));
