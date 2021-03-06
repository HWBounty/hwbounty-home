import { Button, Card, LinearProgress, makeStyles, Slide, TextField, Typography, Zoom } from "@material-ui/core";
import axios from "axios";
import { useSnackbar, withSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import scrollLock from 'scroll-lock';
import SchoologySignUp from "../components/SchoologySignUp";
import { setAuthorizationHeader } from "../redux/actions/userActions";
import { hwbountyAPI } from "../redux/types";

const useStyles = makeStyles(theme => ({
	headBar: {
		height: "7.5rem",
		padding: "1rem",
		paddingBottom: 0,
		display: "flex",
		alignItems: "center",
		background: them => them === 1 ? "rgb(42,42,42)" : "rgb(255,255,255)"
	},
	hwBountyText: {
		fontSize: "3rem",
		textAlign: "left",
		fontFamily: "Nunito",
	},
	hwBountyMotto: {
		fontSize: "1.875rem",
		fontFamily: "Nunito",
	},
	greetingIMG: {
		width: "7.5rem"
	},
	mainPart: {
		width: "100%",
		position: "relative",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	schoolPhoto: {
		width: "100%",
		height: "100vh",
		position: "absolute",
		top: "0%",
		left: "0%",
		filter: "brightness(0.5)",
	},
	tealOverlay: {
		width: "100%",
		height: "100vh",
		position: "absolute",
		top: "0%",
		left: "0%",
		backgroundColor: "rgba(105,180,172,0.5)",
	},
	tagLine: {
		fontFamily: "Oswald",
		fontSize: "5rem",
		textAlign: "left",
	},
	infoLine: {
		fontFamily: "Nunito",
		fontSize: "2.5rem",
		textAlign: "left",
	},
	infoLine2: {
		fontFamily: "Nunito",
		fontSize: "2rem",
		textAlign: "left",
	},
	top: {
		zIndex: 3,
	},
	topDivWrapper: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	joinButton: {
		backgroundColor: "rgb(23,178,172)",
		'&:hover': {
			backgroundColor: "rgb(71 212 206)",
			transition: "transform 1s",
		},
		width: "16rem",
		height: "4rem",
		borderRadius: "0.5rem",
		fontFamily: "Poppins",
		textTransform: "none",
		fontSize: "2rem",
		fontWeight: "400",
		transition: "transform 2s",
		color: them => them === 0 ? "rgb(42,42,42)" : "rgb(255,255,255)",
		marginLeft: "4rem",
	},
	joinButtonScaled: {
		fontSize: -100000,
		width: "8rem",
		height: "8rem",
		// borderRadius: "100rem",
		transform: "scale(50)",
		transition: "all 2s",
		position: "absolute",
		zIndex: 100,
		backgroundColor: "rgb(23,178,172)",
		'&:hover': {
			backgroundColor: "rgb(23,178,172)!important",
		},
	},
	joinButtonPreScaled: {
		position: "absolute",
		width: "8rem",
		height: "8rem",
		top: "50%",
		left: "50%",
		transform: "scale(50)",
		zIndex: 10000000,
		'&:hover': {
			backgroundColor: "rgb(23,178,172)!important",
		},
	},
	joinButtonDescaled: {
		fontSize: -100000,
		width: "8rem",
		height: "8rem",
		borderRadius: "100rem",
		transform: "scale(0.01)",
		transition: "all 0.7s",
		backgroundColor: "rgb(23,178,172)!important",
		'&:hover': {
			backgroundColor: "rgb(23,178,172)!important",
		},
		zIndex: 10000000,
	},
	inputBox: {
		margin: "2rem",
		marginBottom: "0.5rem",
		marginTop: "0.25rem",
	},
	inputBoxWide: {
		margin: "2rem",
		marginTop: "0rem",
		marginBottom: "2rem",
	},






	signupLeftDiv: {
		// position: "absolute",
		top: 0,
		left: 0,
		borderRadius: 0,
		height: "100vh"
	},
	signupText: {
		fontSize: "1.875rem",
		fontFamily: "Nunito",
	},
	signUpButton: {
		height: "3rem",
		minWidth: "10rem",
		fontSize: "2rem",
		textTransform: "none",
		fontFamily: "Poppins",
		fontWeight: "300",
		backgroundColor: "rgb(23,178,172)",
		'&:hover': {
			backgroundColor: "rgb(50,200,200)",
		},
		'&:disabled': {
			backgroundColor: "rgb(100,100,100)",
		},
		color: them => them === 0 ? "rgb(42,42,42)" : "rgb(255,255,255)",
	},
	cuteHopper: {
		margin: "1rem",
		marginBottom: 0,
		height: "8rem",
		width: "8rem",
	}
}));
const perksStyles = makeStyles({
	perksCard: {
		width: "clamp(25vmin,30rem,75vmin)", padding: "2rem", display: "flex",
		alignContent: "center", flexDirection: "column", flexWrap: "nowrap", alignItems: "center"
	},

	perkCardWrapper: { flexGrow: 1, height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", },
	perksCardHeader: { fontFamily: "Nunito", fontSize: "2rem", textAlign: "left", width: "100%" },
	perksCardList: { fontFamily: "Poppins", fontSize: "1.5rem", textAlign: "left", width: "100%", fontWeight: "300", paddingLeft: "3rem" },
	perksCardAuthor: { fontFamily: "Nunito", fontSize: "1.75rem", textAlign: "left", width: "100%", fontWeight: "300", display: "flex", alignItems: "center", },
	perksCardAuthorPfp: { width: "2rem", height: "2rem", borderRadius: "1000vh", },
});
const TealDiamond = (props) => {
	return (<span style={{ color: "rgb(105,180,172)" }}>♦</span>)
}
export const VanityInvite = (props) => {
	const classes = useStyles(props.UI.theme);
	const pstyles = perksStyles(props);
	const [invite, setInvite] = useState(null);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		let inv = ((await axios.get(`${hwbountyAPI}/invite/${window.location.pathname.split("/").pop()}`).catch(console.trace)));
		// console.log(inv.data);
		if (!inv?.data) return;

		setInvite(inv.data);
	}, []);
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();
	useEffect(() => {
		if (window.location.search && window.location.search.match(/\?oauth_token=/)) {
			(async () => {
				let thing = await axios.post(`${hwbountyAPI}/schoologyAuth`, {
					redirectURL: `${window.location.href}`,
					"oauth_token": window.location.search.split("?oauth_token=").pop(),
					nonce: localStorage.getItem("SchoologyNonce")
				}).catch(er => {
					console.log(er);
					enqueueSnackbar(er.response.data.error || er.response.data);
				});
				if (!thing) return;
				setAuthorizationHeader(thing.data);
				enqueueSnackbar("Signed in!")
				setTimeout(() => history.push("/"), 500);

			})()

		}
	}, []);
	const [inForm, setInForm] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [posting, setPosting] = useState(false);
	const [waitForEmail, setWaitForEmail] = useState(false)
	const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
	if (!invite) return null;
	const signup = async () => {
		if (waitForEmail) return;
		setPosting(true);
		let firstName = document.getElementById("fname").value;
		let lastName = document.getElementById("lname").value;
		let email = document.getElementById("email").value;
		let username = document.getElementById("uname").value;
		let pass = document.getElementById("p1").value;
		let cpass = document.getElementById("cp").value;
		if (pass !== cpass) { setPasswordError("Passwords do not match!"); setPosting(false); return; }
		if (username.length < 3) {
			setUsernameError("Username too short! (min. 3 characters)"); setPosting(false); return;
		}
		if (username.length > 32) {
			setUsernameError("Username too long! (max. 32 characters)"); setPosting(false); return;
		}
		if (!username.match(/^[a-zA-Z0-9_]*$/g)) {
			setUsernameError("Username must be alphanumeric. Underscores are allowed."); setPosting(false); return;
		}
		let nameTaken = (await axios.get(`${hwbountyAPI}/usernameTaken/${username}`))?.data;
		if (nameTaken) { setUsernameError("Username already exists!"); setPosting(false); return; }
		if (!email.match(/\S+@\S+\.\S+/)) {
			setEmailError("Invalid Email!"); setPosting(false); return;
		}
		if ((await axios.get(`https://api.hwbounty.help/emailTaken/${email}`).catch(console.trace))?.data) {
			setEmailError("Email already in use!"); setPosting(false); return;
		}
		const userData = {
			email, firstName, lastName, username, password: pass,
			vanitySignup: window.location.pathname.split('/').pop(),

		};
		console.log(userData);
		const result = await axios
			.post(`${hwbountyAPI}/signup`, userData)
			.catch((err) => console.log(err));
		if (result) {
			document.getElementById("signup").childNodes.item(0).innerText = "Check your Email!";
			document.getElementById("signup").disabled = true;
		}
		setPosting(false);
		setWaitForEmail(true);
	}

	if (inForm) {

		return (
			<div >
				<div className={classes.joinButtonPreScaled} id="signup2" />
				<div className={classes.mainPart}>
					<div className={classes.schoolPhoto}
						style={{
							background: `url(${invite.backgroundImage})center/cover`,
							width: "100%",
							height: "100vh",
							overflow: "hidden",
						}} />
					<div className={classes.tealOverlay} style={{
						width: "100%",
						height: "100vh",
						overflow: "hidden",
					}} />
					<div className={`${classes.top} ${classes.topDivWrapper}`} style={{ width: "100%", flexDirection: "row", overflowY: "hidden", maxHeight: "100vh" }}>
						<div class="box" style={{
						}}>
							<div class="container">
								<Slide direction="right"
									in
									style={{ transitionDelay: "500ms" }}
									timeout={500}
								>
									<Card className={classes.signupLeftDiv}>
										{posting && <LinearProgress />}

										<img className={classes.cuteHopper} src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png" />
										<div>
											<SchoologySignUp />

										</div>
										<Typography className={classes.signupText}>HWBounty Sign Up</Typography>
										<form style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "stretch"
										}}>
											<div>
												<TextField label="First Name" variant="outlined" className={classes.inputBox} id="fname" />
												<TextField label="Last Name" variant="outlined" className={classes.inputBox} id="lname" />
											</div>

											<br />
											<TextField label="Email" variant="outlined" className={classes.inputBoxWide} helperText={emailError} error={!!emailError} id="email" onChange={() => setEmailError("")} />
											<TextField label="Username" variant="outlined" className={classes.inputBoxWide} helperText={usernameError} error={!!usernameError} id="uname" onChange={() => setUsernameError("")} />
											<div>
												<TextField label="Password" variant="outlined" className={classes.inputBoxWide} type="password" helperText={passwordError} error={!!passwordError} id="p1" onChange={() => setPasswordError("")} />
												<TextField label="Confirm Password" variant="outlined" className={classes.inputBoxWide} type="password" helperText={passwordError} error={!!passwordError} id="cp" onChange={() => setPasswordError("")} />
											</div>


											<Button style={{
												alignSelf: "center"
											}} variant="contained" className={`${classes.signUpButton}`} onClick={signup} id="signup">Go!</Button>


										</form>
									</Card>
								</Slide>

							</div>
						</div>
						<div className={pstyles.perkCardWrapper}>
							<Zoom in
								style={{ transitionDelay: "750ms" }}
								timeout={750}
							>
								<Card className={pstyles.perksCard}>
									<Typography className={pstyles.perksCardHeader}>Perks:</Typography>
									<Typography className={pstyles.perksCardList}>
										<TealDiamond /> Free Premium (1 Month)
									<br />
										<TealDiamond /> 500 Coins Signup Bonus
									<br />
										<TealDiamond /> Completely Free
									<br />
										<TealDiamond /> No Ads for Life
								</Typography>
									<Typography className={pstyles.perksCardAuthor}>Invite by: &nbsp;<img src={invite.user.pfp} className={pstyles.perksCardAuthorPfp} /> &nbsp;<b>{invite.user.publicID}</b>  &nbsp;(&nbsp;{invite.user.firstName}&nbsp;{invite.user.lastName}&nbsp;)</Typography>
								</Card>
							</Zoom>
						</div>


					</div>

					{/*  */}
				</div>
			</div >
		);
	}
	const signupClick = () => {

		document.getElementById("signup").classList.add(classes.joinButtonScaled);
		document.getElementById("signup").innerHTML = "";
		localStorage.setItem("vanityInvite", window.location.pathname.split("/").pop());
		if (props?.user?.authenticated) {
			history.push("/");
			window.location.reload();
		}
		(async () => {
			await sleep(400);
			setInForm(true);
			await sleep(5);
			document.getElementById("signup2").classList.add(classes.joinButtonDescaled);
			await sleep(2005);
			document.getElementById("signup2").remove();
		})();
	}
	return (
		<div style={{ height: "100%", display: "flex" }}>
			{/* <div className={`${classes.headBar}`}>
                <img
                    src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png"
                    className={classes.greetingIMG}
                /> <Typography className={`${classes.hwBountyText}`}>HW Bounty </Typography>
            </div> */}

			<div className={classes.mainPart}>
				<div className={classes.schoolPhoto}
					style={{
						background: `url(${invite.backgroundImage})center/cover`,
					}} />
				<div className={classes.tealOverlay} />
				<div className={`${classes.top} ${classes.topDivWrapper}`}>
					<Typography className={classes.tagLine}>The modern student’s best friend</Typography>
					<Typography className={classes.infoLine}><b>{invite.user.firstName}</b> invited you to join HWBounty - [ {invite.name} ]</Typography>
					<br /><br />
					<Typography className={classes.infoLine2}>Schedules  <TealDiamond />  Calculators  <TealDiamond />  Homework Help</Typography>
					<br />
					<Button variant="contained" className={classes.joinButton} id="signup" onClick={signupClick}>{props?.user?.authenticated ? "Use Preset!" : "Sign me up!"}</Button>

				</div>

				{/* <img className={classes.cuteHopper} src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png" /> */}
			</div>
		</div>

	)
}
const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});
export default connect(mapStateToProps)(withSnackbar(VanityInvite));