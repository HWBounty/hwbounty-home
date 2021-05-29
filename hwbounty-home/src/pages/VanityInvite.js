import { Button, Card, makeStyles, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";

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
    cuteHopper: {
        position: "float",
        top: "100%",
        right: "50%",
        transform: "translate(50%,50%)",
        zIndex: 2,
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
        '&:hover': {
            backgroundColor: "rgb(23,178,172)!important",
            transition: "all 1s",
        },
        position: "absolute",
        zIndex: 100,
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
        margin: "0.5rem",
    },
    inputBoxWide: {
        margin: "1.5rem",
    }
}));
const TealDiamond = (props) => {
    return (<span style={{ color: "rgb(105,180,172)" }}>♦</span>)
}
export const VanityInvite = (props) => {
    console.log(props);
    const classes = useStyles(props.UI.theme);
    const [invite, setInvite] = useState(
        {
            "inviteID": "gunn",
            "name": "Gunn",
            "creator": "0",
            "schedule": "1",
            "classesRegex": "^\\d+",
            "backgroundImage": "https://dowdleandsonsmech.com/wp-content/uploads/2016/05/Gunn-HS-Finished-No-2.jpg",
            "uses": 0,
            "user": {
                "firstName": "John",
                "lastName": "Li",
                "publicID": "Tet",
                "createdAt": "1619835675925",
                "bio": "\tYou creatures who have fought with strength, violence, blood and death, who built a tower of corpses that rises to the sky and call yourselves wise, tell me this: What is the difference between you and the dumb beasts?",
                "privateID": 0,
                "namePublic": 1,
                "userscol": null,
                "bal": 3957,
                "pbal": 0,
                "pfp": "https://i.ibb.co/7SXMbxp/c67dc8b9f980.png",
                "schedule": 1,
                "classes": "{\"period1\":{\"value\":\"2772296125\"},\"period2\":{\"value\":\"2772297879\"},\"period3\":{\"value\":\"2772299958\"},\"period4\":{\"value\":\"2772302878\"},\"break\":{\"value\":\"None\"},\"period5\":{\"value\":\"2772303225\"},\"period6\":{\"value\":\"2772305559\"},\"period7\":{\"value\":\"2772307416\"},\"period8\":{\"value\":\"None\"},\"period9\":{\"value\":\"2772321865\"}}",
                "tags": "staff,backendDev",
                "balpublic": 1,
                "allowDMsFrom": 0,
                "premiumEndsAt": "999999999999999",
                "usernameChangesLeft": 0,
                "invitedBy": null,
                "previousNames": "",
                "username": "Tet"
            },
            "valid": true
        }
    );
    const [inForm, setInForm] = useState(false);
    if (inForm) {
        return (
            <div>
                <div className={classes.joinButtonPreScaled} id="signup2" />
                <div className={`${classes.headBar}`}>
                    <img
                        src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png"
                        className={classes.greetingIMG}
                    /> <Typography className={`${classes.hwBountyText}`}>Signup </Typography>
                </div>
                <div className={classes.mainPart}>
                    <div className={classes.schoolPhoto}
                        style={{
                            background: `url(${invite.backgroundImage})center/cover`,
                        }} />
                    <div className={classes.tealOverlay} />
                    <div className={`${classes.top} ${classes.topDivWrapper}`}>
                        <div class="box" style={{
                        }}>
                            <div class="container">
                                <Card>
                                    <Typography className={classes.hwBountyText}>HWBounty Sign Up</Typography>
                                    <form style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "stretch"
                                    }}>
                                        <div>
                                            <TextField label="First Name" variant="outlined" className={classes.inputBox} />
                                            <TextField label="Last Name" variant="outlined" className={classes.inputBox} />
                                        </div>

                                        <br />
                                        <TextField label="Email" variant="outlined" className={classes.inputBoxWide} />
                                        <TextField label="Username" variant="outlined" className={classes.inputBoxWide} />
                                        <TextField label="Password" variant="outlined" className={classes.inputBoxWide} />
                                        <TextField label="Confirm Password" variant="outlined" className={classes.inputBoxWide} />
                                        <Button style={{
                                            width: "25%",
                                            height: "2rem",
                                            alignSelf: "center"
                                        }} variant="contained">Go!</Button>
                                    </form>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* <img className={classes.cuteHopper} src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png" /> */}
                </div>
            </div>
        );
    }
    const signupClick = () => {
        document.getElementById("signup").classList.add(classes.joinButtonScaled);
        document.getElementById("signup").innerHTML = "";
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
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
            <div className={`${classes.headBar}`}>
                <img
                    src="https://cdn.discordapp.com/attachments/836672960566919228/838871035117568120/frogfinal-01.png"
                    className={classes.greetingIMG}
                /> <Typography className={`${classes.hwBountyText}`}>HW Bounty </Typography>
            </div>
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