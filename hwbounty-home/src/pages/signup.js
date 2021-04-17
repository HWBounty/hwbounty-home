import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import '../login.css';
import $ from 'jquery';
//MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
import { connect } from "react-redux";
import { loginUser, signupUser } from "../redux/actions/userActions";
import axios from "axios";
import { Container, Modal } from "@material-ui/core";

const styles = (theme) => ({
	...theme.spreadIt,
});

class Signup extends Component {
	constructor() {
	
	}
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
						<Typography variant="subtitle1" id="loginFailed">SignupFailed!</Typography>
						<form>
							<div class="input-container">
								<input type="any" id="fName" required="required" onChange={this.handleChange} />
								<label for="#{label}">First Name</label>
								<div class="bar"></div>
							</div>
							<div class="input-container">
								<input type="any" id="lName" required="required" onChange={this.handleChange} />
								<label for="#{label}">Last Name</label>
								<div class="bar"></div>
							</div>
							<div class="input-container">
								<input type="any" id="email" required="required" onChange={this.handleChange} />
								<label for="#{label}">Email</label>
								<div class="bar"></div>
							</div>
							<div class="input-container">
								<input type="any" id="username" required="required" onChange={this.handleChange} />
								<label for="#{label}">Username</label>
								<div class="bar"></div>
							</div>

							<div class="input-container">
								<input type="password" id="password" required="required" onChange={this.handleChange} />
								<label for="#{label}">Password</label>
								<div class="bar"></div>
							</div>
							<div class="input-container">
								<input type="password" id="Confirmpassword" required="required" onChange={this.handleChange} />
								<label for="#{label}">Confirm Password</label>
								<div class="bar"></div>
							</div>
							<div class="button-container">
								<button onClick={this.handleSubmit}><span>Go</span></button>
							</div>
							<div class="footer"><a href="/login">Already have an account?</a></div>
						</form>
					</Card>
				</div>
			</div>
		)
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