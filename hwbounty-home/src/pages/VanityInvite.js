import { Button, Card, LinearProgress, makeStyles, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import scrollLock from 'scroll-lock';
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
        height: "calc(60rem)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    schoolPhoto: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0%",
        left: "0%",
        filter: "brightness(0.5)",
    },
    tealOverlay: {
        width: "100%",
        height: "100%",
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
            transition: "all .3s",
        },
        width: "16rem",
        height: "4rem",
        borderRadius: "0.5rem",
        fontFamily: "Poppins",
        textTransform: "none",
        fontSize: "2rem",
        fontWeight: "400",
        transition: "all .3s",
        color: them => them === 0 ? "rgb(42,42,42)" : "rgb(255,255,255)",
        marginLeft: "4rem",
    },
    joinButtonScaled: {
        fontSize: -100000,
        width: "8rem",
        height: "8rem",
        // borderRadius: "100rem",
        transform: "scale(50)",
        transition: "all 1s",
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
        zIndex: 100,
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
        zIndex: 100,
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
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: 0,
        height: "100%"
    },
    signupText: {
        fontSize: "1.875rem",
        fontFamily: "Nunito",
    },
    signUpButton: {
        height: "3rem",
        width: "10rem",
        textTransform: "none",
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
const TealDiamond = (props) => {
    return (<span style={{ color: "rgb(105,180,172)" }}>♦</span>)
}
export const VanityInvite = (props) => {
    const classes = useStyles(props.UI.theme);
    const [invite, setInvite] = useState(null);
    useEffect(async () => {
        let inv = ((await axios.get(`${hwbountyAPI}/invite/${window.location.href.split("/").pop()}`).catch(console.trace)));
        console.log(inv.data);
        setInvite(inv.data);
    }, []);
    const [inForm, setInForm] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [posting, setPosting] = useState(false);
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    if (!invite) return null;
    const signup = async () => {
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
            vanitySignup: window.location.href.split('/').pop(),

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
                            height: "100%",
                            overflow: "hidden",
                        }} />
                    <div className={classes.tealOverlay} style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                    }} />
                    <div className={`${classes.top} ${classes.topDivWrapper}`}>
                        <div class="box" style={{
                        }}>
                            <div class="container">
                                <Card className={classes.signupLeftDiv}>
                                    {posting && <LinearProgress />}
                                    <img className={classes.cuteHopper} src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png" />
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
                            </div>
                        </div>
                    </div>

                    {/*  */}
                </div>
            </div>
        );
    }
    const signupClick = () => {
        document.getElementById("signup").classList.add(classes.joinButtonScaled);
        document.getElementById("signup").innerHTML = "";

        (async () => {
            await sleep(750);
            setInForm(true);
            await sleep(5);
            document.getElementById("signup2").classList.add(classes.joinButtonDescaled);
            await sleep(2005);
            document.getElementById("signup2").remove();
        })();
    }
    return (
        <div>
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
                    <Button variant="contained" className={classes.joinButton} id="signup" onClick={signupClick}>Sign me up!</Button>

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
export default connect(mapStateToProps)(VanityInvite);