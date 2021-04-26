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
import { loginUser } from "../redux/actions/userActions";
import signup from "./signup";
import { getRandomBackground } from "../util/randomBackground";
import axios from "axios";

const styles = (theme) => ({
	...theme.spreadIt,
});

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {},
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
				document.getElementById("loginFailedVisible").id = "loginFailed"
			const userData = {
				email: this.state.email,
				password: this.state.password,
			};
			const result = await this.props.loginUser(userData, this.props.history);
			if (!result)
				document.getElementById("loginFailed").id = "loginFailedVisible"
		} catch (error) {

		}

	};
	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	};
	render() {
		const {
			classes,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;
		axios.get("https://api.hwbounty.help/@me").then((res) => {
			if (res.status === 200 && res.data && res.data.password) {
				window.location.href = window.location.origin;
			}
		}).catch(console.trace);
		//Hide header
		return (
			<div class="box" >
				<div class="container">
					{/* <Card></Card> */}
					<Card>
						<Typography variant="h1">HWBounty Login</Typography>
						{/* <Typography variant="subtitle1" id="loginFailed">Incorrect Login Credentials!</Typography> */}
						<form>
							<div class="input-container">
								<input type="any" id="email" required="required" onChange={this.handleChange} />
								<label for="#{label}">Email or Username</label>
								<div class="bar"></div>
							</div>
							<div class="input-container">
								<input type="password" id="password" required="required" onChange={this.handleChange} />
								<label for="#{label}">Password</label>
								<div class="bar"></div>
							</div>
							<div class="button-container">
								<button onClick={this.handleSubmit}><span>Go</span></button>
							</div>
							<div class="footer"><a href="#">Forgot your password?</a><br /><a href="/signup">Dont have an account?</a></div>
						</form>
					</Card>
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});

const mapActionsToProps = {
	loginUser,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Login));