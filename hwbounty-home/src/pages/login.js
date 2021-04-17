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
	handleSubmit = (event) => {
		event.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(userData, this.props.history);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	render() {
		const {
			classes,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;
		return (
			<div class="container">
				<div class="card"></div>
				<div class="card">
					<h1 class="title">Login</h1>
					<form>
						<div class="input-container">
							<input type="#{type}" id="#{label}" required="required" />
							<label for="#{label}">Username</label>
							<div class="bar"></div>
						</div>
						<div class="input-container">
							<input type="#{type}" id="#{label}" required="required" />
							<label for="#{label}">Password</label>
							<div class="bar"></div>
						</div>
						<div class="button-container">
							<button><span>Go</span></button>
						</div>
						<div class="footer"><a href="#">Forgot your password?</a></div>
					</form>
				</div>
				<div class="card alt">
					<div class="toggle" onClick={() => {
						$('.container').stop().addClass('active');
					}
					}></div>
					<h1 class="title">Register
      				<div class="close" onClick={()=>{
						  $('.container').stop().removeClass('active');
					  }}></div>
					</h1>
					<form>
						<div class="input-container">
							<input type="#{type}" id="#{label}" required="required" />
							<label for="#{label}">Username</label>
							<div class="bar"></div>
						</div>
						<div class="input-container">
							<input type="#{type}" id="#{label}" required="required" />
							<label for="#{label}">Password</label>
							<div class="bar"></div>
						</div>
						<div class="input-container">
							<input type="#{type}" id="#{label}" required="required" />
							<label for="#{label}">Repeat Password</label>
							<div class="bar"></div>
						</div>
						<div class="button-container">
							<button><span>Next</span></button>
						</div>
					</form>
				</div>
			</div>
		)
		// return (
		//   <Card className={classes.formCard}>
		//     <Grid container className={classes.form}>
		//       <Grid item xs={3} />
		//       <Grid item sm>
		//         {/* <img src={AppIcon} alt="hwbounty logo" className={classes.image} /> */}
		//         <Typography variant="h2" className={classes.pageTitle}>
		//           Login
		//         </Typography>
		//         <form noValidate onSubmit={this.handleSubmit}>
		//           <TextField
		//             id="email"
		//             name="email"
		//             type="email"
		//             label="Email"
		//             className={classes.textField}
		//             helperText={errors.email}
		//             error={errors.email ? true : false}
		//             value={this.state.email}
		//             onChange={this.handleChange}
		//             fullWidth
		//           />
		//           <TextField
		//             id="password"
		//             name="password"
		//             type="password"
		//             label="Password"
		//             className={classes.textField}
		//             helperText={errors.password}
		//             error={errors.password ? true : false}
		//             value={this.state.password}
		//             onChange={this.handleChange}
		//             fullWidth
		//           />
		//           {errors.general && (
		//             <Typography variant="body2" className={classes.customError}>
		//               {errors.general}
		//             </Typography>
		//           )}
		//           <Button
		//             type="submit"
		//             variant="contained"
		//             color="primary"
		//             className={classes.button}
		//             disabled={loading}
		//           >
		//             Login
		//             {loading && (
		//               <CircularProgress className={classes.progress} size={30} />
		//             )}
		//           </Button>
		//           <br />
		//           <small>
		//             Don't have an account ? sign up <Link to="/signup">here</Link>
		//           </small>
		//         </form>
		//       </Grid>
		//       <Grid item xs={3} />
		//     </Grid>
		//   </Card>
		// );
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