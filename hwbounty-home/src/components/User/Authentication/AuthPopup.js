// React
import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

// Redux
import { connect } from "react-redux";
import { setAuthPopupOpen } from "../../../redux/actions/uiActions";
import { loginUser, signupUser } from "../../../redux/actions/userActions";

// Components
import Login from "./Login";
import Signup from "./Signup";

export const AuthPopup = (props) => {
  const {
    setAuthPopupOpen,
    loginUser,
    signupUser,
    UI: { authPopupOpen },
  } = props;

  const handleClose = () => {
    setAuthPopupOpen(false);
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={authPopupOpen} onClose={handleClose}>
      <Login loginUser={loginUser} />
    </Dialog>
  );
};

AuthPopup.propTypes = {
  open: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  setAuthPopupOpen,
  loginUser,
  signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(AuthPopup);
