// React
import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

// MUI
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  inputField: {
    display: "block",
    width: "90%",
  },
});

const Login = (props) => {
  const { loginUser } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    loginUser({ email, password });
  };
  return (
    <Fragment>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          type="email"
          label="Email Address"
          onChange={handleEmailChange}
          value={email}
          className={classes.inputField}
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
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Fragment>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default Login;
