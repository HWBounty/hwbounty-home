// React
import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Redux
import { connect } from "react-redux";
import { setAuthPopupOpen } from "../../redux/actions/uiActions";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  inputFields: {
    width: "90%",
  },
});

export const AuthPopup = (props) => {
  const {
    setAuthPopupOpen,
    UI: { authPopupOpen },
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {};

  const handleClose = () => {
    setAuthPopupOpen(false);
  };

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={authPopupOpen}
      onClose={handleClose}
      className={classes.root}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          type="email"
          label="Email Address"
          onChange={handleEmailChange}
          value={email}
          className={classes.inputFields}
        />
        <TextField
          type="password"
          label="Password"
          onChange={handlePasswordChange}
          value={password}
          className={classes.inputFields}
        />
      </DialogContent>
      <DialogActions>
        <Button>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

AuthPopup.propTypes = {
  open: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { setAuthPopupOpen })(AuthPopup);
