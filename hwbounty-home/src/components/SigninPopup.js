import React, { useState } from "react";

import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";

import { useSnackbar, withSnackbar } from "notistack";

import axios from "axios";

import { hwbountyAPI } from "../redux/types";
import { setAuthorizationHeader } from "../redux/actions/userActions";
import t from "../util/localization/localization";

const useStyles = makeStyles({
  inputField: {
    // display: "block",
    // width: "90%",
    // marginBottom: "0.5"
  },
});

export const SigninPopup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    axios
      .post(`${hwbountyAPI}/login`, {
        email,
        password,
      })
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        enqueueSnackbar("Logged in successfully!", {
          variant: "success",
        });
        props.setter(false);
        setSubmitting(false);
        // setTimeout(() => {
        // 	window.location.reload();
        // }, 1000);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          enqueueSnackbar("Invalid Email or Password!", {
            variant: "error",
          });
        }
        setSubmitting(false);
      });
  };
  return (
    <Dialog open={props.authOpen} onClose={() => props.setter(false)}>
      {submitting && <LinearProgress />}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            autoFocuss
            type="email"
            label="Email Address"
            onChange={handleEmailChange}
            value={email}
            className={classes.inputField}
            style={
              {
                // marginBottom: "0.25rem"
              }
            }
          />
          <br />
          <TextField
            type="password"
            label="Password"
            onChange={handlePasswordChange}
            value={password}
            className={classes.inputField}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit()} color="primary">
          {t("signInPopup.signIn")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps)(withSnackbar(SigninPopup));
