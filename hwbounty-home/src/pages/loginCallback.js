import React, { Component } from "react";

import PropTypes from "prop-types";

import "../login.css";

//MUI Stuff
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux stuff
import { connect } from "react-redux";

import { loginUser, signupUser } from "../redux/actions/userActions";

import axios from "axios";

const styles = (theme) => ({
  ...theme.spreadIt,
});

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      fName: "",
      lName: "",
      username: "",
      errors: {},
      open: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = async (event) => {
    try {
      let state = Object.assign({}, this.state);
      if (state.loggingIn) return;
      state.loggingIn = true;
      this.setState(state);
      event.preventDefault();
      if (document.getElementById("loginFailedVisible"))
        document.getElementById("loginFailedVisible").id = "loginFailed";
      // {
      // 	"email": "jl38768@pausd.us",
      // 	"firstName": "Teto",
      // 	"lastName": "theOldOne",
      // 	"password": "nya",
      // 	"username": "tety"
      //   }
      const userData = {
        email: this.state.email,
        firstName: this.state.fName,
        lastName: this.state.lName,
        username: this.state.username,
        password: this.state.password,
      };
      const result = await this.props.signupUser(userData, this.props.history);
      try {
        if (!result)
          document.getElementById("loginFailed").id = "loginFailedVisible";
        else {
          alert(
            "Your account is now pending confirmation! Please go into your email and click on the verification link!"
          );
        }
      } catch (error) {}
      document.getElementById("loginFailedVisible").innerText =
        "Signup failed!";
    } catch (error) {}
  };
  handleClose = (event) => {
    this.setState({
      open: false,
    });
  };
  handleChange = async (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    if (event.target.id === "username") {
      let res = (
        await axios
          .get(`https://api.hwbounty.help/usernameTaken/${event.target.value}`)
          .catch(console.trace)
      ).data;
      if (res) {
        try {
          document.getElementById("loginFailed").id = "loginFailedVisible";
        } catch (error) {}
        document.getElementById("loginFailedVisible").innerText =
          "Invalid Username! Does it exist already?";
      } else {
        try {
          document.getElementById("loginFailedVisible").id = "loginFailed";
        } catch (error) {}
      }
    }
    if (event.target.id === "email") {
      let res = (
        await axios
          .get(`https://api.hwbounty.help/emailTaken/${event.target.value}`)
          .catch(console.trace)
      ).data;
      if (res) {
        try {
          document.getElementById("loginFailed").id = "loginFailedVisible";
        } catch (error) {}
        document.getElementById("loginFailedVisible").innerText =
          "This email is already in use!";
      } else {
        try {
          document.getElementById("loginFailedVisible").id = "loginFailed";
        } catch (error) {}
      }
    }
    if (event.target.id.includes("password")) {
      //Confirmpassword
      if (
        document.getElementById("password").value !==
        document.getElementById("Confirmpassword").value
      ) {
        try {
          document.getElementById("loginFailed").id = "loginFailedVisible";
        } catch (error) {}
        document.getElementById("loginFailedVisible").innerText =
          "The passwords dont match!";
      } else {
        try {
          document.getElementById("loginFailedVisible").id = "loginFailed";
        } catch (error) {}
      }
    }
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    //Hide header
    return (
      <div class="box">
        <div class="container">
          {/* <Card></Card> */}
          <Card>
            <Typography variant="h1">HWBounty Sign Up</Typography>
            <Typography variant="subtitle1" id="loginFailed">
              SignupFailed!
            </Typography>
            <form>
              <div class="input-container">
                <input
                  type="any"
                  id="fName"
                  required="required"
                  onChange={this.handleChange}
                />
                <label for="#{label}">First Name</label>
                <div class="bar"></div>
              </div>
              <div class="input-container">
                <input
                  type="any"
                  id="lName"
                  required="required"
                  onChange={this.handleChange}
                />
                <label for="#{label}">Last Name</label>
                <div class="bar"></div>
              </div>
              <div class="input-container">
                <input
                  type="any"
                  id="email"
                  required="required"
                  onChange={this.handleChange}
                />
                <label for="#{label}">Email</label>
                <div class="bar"></div>
              </div>
              <div class="input-container">
                <input
                  type="any"
                  id="username"
                  required="required"
                  onChange={this.handleChange}
                />
                <label for="#{label}">Username</label>
                <div class="bar"></div>
              </div>

              <div class="input-container">
                <input
                  type="password"
                  id="password"
                  required="required"
                  onChange={this.handleChange}
                />
                <label for="#{label}">Password</label>
                <div class="bar"></div>
              </div>
              <div class="input-container">
                <input
                  type="password"
                  id="Confirmpassword"
                  required="required"
                  onChange={this.handleChange}
                />
                <label for="#{label}">Confirm Password</label>
                <div class="bar"></div>
              </div>
              <div class="button-container">
                <button onClick={this.handleSubmit}>
                  <span>Go</span>
                </button>
              </div>
              <div class="footer">
                <a href="/login">Already have an account?</a>
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup));
