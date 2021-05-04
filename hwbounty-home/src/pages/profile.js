import {
	Avatar,
	Card,
	Chip,
	Fade,
	makeStyles,
	Modal,
	withStyles,
} from "@material-ui/core";
import { useState } from "react";
import {
	Button,
	Container,
	List,
	ListItem,
	Paper,
	TextField,
	Typography,
} from "@material-ui/core";

import Fuse from "fuse.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { hwbountyAPI } from "../redux/types";
import badges from "../util/badges";
import React from "react";
import moment from "moment";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
/*
TODO: remove mui theme provider here, it should work without it!!!
(maybe check pallete or something?, color is sent but dark mode is not)
*/

const chipStyles = makeStyles((theme) => ({
	root: {
		fontSize: (props) => `${props.size * 0.8125}rem`,
		height: (props) => `${props.size * 32}px`,
		borderRadius: "9999px",
		backgroundColor: (props) => `${props.color}!important`,
		margin: "10px",
	},
	avatar: {
		"&&": {
			height: (props) => `${props.size * 24}px`,
			width: (props) => `${props.size * 24}px`,
			fontSize: (props) => `${props.size * 0.75}rem`
		}
	},
	deleteIcon: {
		height: (props) => `${props.size * 22}px`,
		width: (props) => `${props.size * 22}px`,
		color: "green"
	}
}));
const CustomChip = (props) => {
	const { size = 1, color = "rgb(0,0,0)", ...restProps } = props;
	const classes = chipStyles({ size, color });

	return (
		<Chip
			className={classes.root}
			classes={{ avatar: classes.avatar, deleteIcon: classes.deleteIcon }}
			{...restProps}
		/>
	);
}



const styles = (theme) => ({
	...theme.spreadIt,
});
const useStyles = makeStyles({
	large: {
		width: "100px",
		height: "100px",

	},
	profileDiv: {
		position: "relative",
		top: 0,
		left: 0,
		transform: "translate(25%,0%)",
		marginTop: "1vh",
		borderRadius: 1000,
		width: "20vw",
		height: "20vw",
		boxShadow: "0px 2px 5px -1px rgb(0 0 0 / 20%), 4px 6px 8px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important",


	},
	hoverBlur: {
		"&:hover": {
			boxShadow: "14px 20px 20px -1px rgb(0 0 0 / 20%), 4px 6px 8px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important",
			"-webkit-filter": "blur(5px)",
			"-moz-filter": "blur(5px)",
			"-o-filter": "blur(5px)",
			"-ms-filter": "blur(5px)",
			"filter": "blur(5px)",
		},
	},
	profileBuffer: {
		width: "10vw",
		height: "24vw",
	},
	profileHoverText: {
		"&:hover": {

			opacity: 0.5,
		},
		// verticalAlign: "middle!important",
		fontSize: window.innerWidth / 50,
		color: "rgb(239,239,239)",
		opacity: 0,
		backgroundColor: "rgba(0,0,0,1)",
		zIndex: 100000,
		fontFamily: "Nunito",
		verticalAlign: "middle",
	},
	profileHoverTextText: {
		// verticalAlign: "middle!important",
		fontSize: window.innerWidth / 50,
		zIndex: 100000,
		fontFamily: "Nunito",
		position: "absolute",
		transform: "translate(50%,50%)",
		color: "rgb(239,239,239)",
	},
	card: {
		borderRadius: "1vw!important",
		background: theme => theme ? "rgb(67,67,67)" : "rgb(239,239,239)",
		boxShadow: "0px 2px 5px -1px rgb(0 0 0 / 20%), 4px 6px 8px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important"
	},
	mainInfoCard: {
		position: "relative",
		maxWidth: "30%",
		maxHeight: "80%",
		minWidth: "30%",
		minHeight: "80%",
		height: "90vh!important",
		display: "block",
		marginTop: "5%",
		marginLeft: "5%",
	},
	nameandPasswordCard: {
		display: "inline-block",
		position: "absolute",
		top: "10%",
		right: "10%",
		margin: 0,
		maxHeight: "25%",
		minWidth: "50%",
		minHeight: "25%",
	},
	mainInfoEverything: {
		display: "flex",
		alignItems: "center",
	},
	name: {
		marginTop: "3vh",
		fontSize: 48,
	},
	bio: {
		marginTop: "3vh",
		fontFamily: "Nunito",
		fontSize: window.innerHeight / 50,
		maxWidth: "15vw",
		display: "inline-block",
	},
	text: {
		color: theme => theme ? "rgb(252,252,252)" : "rgb(0,0,0)",
	},
	DMtext: {
		color: theme => theme ? "rgb(252,252,252)" : "rgb(0,0,0)",
	},
	infoLabel: {
		fontFamily: "Poppins",
		fontSize: window.innerHeight / 50,
		marginLeft: "5%",
		textAlign: "left",
	},
	infoText: {
		fontFamily: "Nunito",
		fontSize: window.innerHeight / 30,
		textAlign: "center",
	},
	chip: {
		size: "large",
		// height: window.innerHeight / 
	},
	balanceCard: {
		display: "inline-block",
		position: "absolute",
		top: "40%",
		right: "30%",
		margin: 0,
		padding: 0,
		maxHeight: "10%",
		minWidth: "30%",
		minHeight: "10%",
	},
	balanceText: {
		position: "absolute",
		top: "50%",
		left: "10%",
		transform: "translate(0%,-50%)"
	}
});
export const Profile = (props) => {
	const {
		UI: { theme },
	} = props;
	const [userData, setUserData] = useState(null);
	const [fetching, setFetching] = useState(false);
	const [error, setError] = useState(false);
	const [editingBio, setEditingBio] = useState(false);
	const history = useHistory();
	const classes = useStyles(theme);
	const [bio, setBio] = useState("");
	const [pfp, setPfp] = useState("");
	const [ShowPfpChangeMSG, setShowPfpChangeMSG] = useState(false);
	const onClickPfp = () => {
		document.getElementById("pfpFileInput").click();
	}
	const { enqueueSnackbar } = useSnackbar();
	const renderChips = (data) => {
		if (!data) return null;
		data = data.split(",");
		if (parseInt(userData?.premiumEndsAt) && Date.now() < parseInt(userData.premiumEndsAt)) data.push({
			// premiumEndsAt
			name: "Premium Member",
			color: "rgb(118,137,211)",
			description: `A Premium member of HWBounty! Ends in ${moment(parseInt(JSON.parse(localStorage.getItem("user"))?.premiumEndsAt)).fromNow()}`
		})
		return React.Children.toArray(
			data.map((x) => {
				return (
					<CustomChip
						label={x.name || badges[x]?.name || "Unknown Badge!"}
						color={x.color || badges[x]?.color}
						onClick={() => enqueueSnackbar(`${x.description || badges[x].description}`)}
						size={(window.innerHeight * window.innerWidth) ** 0.025}
					/>
				);
			})
		)

	};
	if (error) {
		// history.push()
		return null;
	}
	if (!userData && !fetching) {
		setFetching(true);
		(async () => {
			let fetchres = await axios
				.get(
					`${hwbountyAPI}/user/${history.location.pathname.split("/").pop()}`
				)
				.catch((er) => {
					console.trace(er);
					setError(true);
				});
			if (fetchres && fetchres.status === 200) {
				setBio(fetchres.data.bio);
				setPfp(fetchres.data.pfp);
				setUserData(fetchres.data);

				setFetching(false);
			}
		})();
	}
	const handleEditBio = () => {
		if (
			userData &&
			localStorage.getItem("user") &&
			JSON.parse(localStorage.getItem("user"))?.privateID === userData.privateID
		) {
			setEditingBio(true);
		}
	};
	const postBio = async () => {
		enqueueSnackbar("Updating bio...");
		let updateSelf = await axios.post(`${hwbountyAPI}/updateSelf`, {
			bio: bio,
		});
		enqueueSnackbar("Bio updated!");
	};
	const stopEditingBio = () => {
		if (!bio) setBio(userData.bio);
		postBio();
		setEditingBio(false);
	};
	const updateBio = (event, nv) => {
		let val = (nv || event.target.value);
		if (val.length > 256) {
			enqueueSnackbar(`Your Bio is at the 250 char. limit!`);
			val = val.substring(0, 256);
		}
		setBio(val);
	};
	const updatePfp = (event, nv) => {
		const FR = new FileReader();
		FR.onloadend = async (e) => {
			setPfp(e.target.result || event.target.value);
			enqueueSnackbar(`Setting New Profile Picture...`);
			console.log(
				e.target.result.substring(0, 25),
				e.target.result.substring(e.target.result.indexOf(",") + 1)
			);
			await axios.post(`${hwbountyAPI}/changePfp`, {
				base64: e.target.result.substring(e.target.result.indexOf(",") + 1),
			});
			enqueueSnackbar(`Set new profile picture!`);
		};
		FR.readAsDataURL(document.getElementById("pfpFileInput").files[0]);
	};
	if (userData) {
		return (
			<div>
				<input type="file" onChange={updatePfp} id="pfpFileInput" style={{
					display: "none",
				}} />
				<Card className={`${classes.card} ${classes.mainInfoCard}`}>
					<div className={classes.mainInfoEverything}>


						<img src={pfp || "https://cdn1.iconfinder.com/data/icons/materia-human/24/013_003_account_profile_circle-512.png"} className={`${classes.profileDiv} ${JSON.parse(localStorage.getItem("user"))?.privateID ===
							userData.privateID && classes.hoverBlur}`}
							onClick={
								JSON.parse(localStorage.getItem("user"))?.privateID ===
								userData.privateID && onClickPfp
							} ></img>
					</div>
					<Typography variant="h5" className={classes.name}>{userData.firstName} {userData.lastName}</Typography>
					{!editingBio ? (<Typography variant="h5" onClick={handleEditBio} className={classes.bio} style={{
						width: "100%",
						minWidth: "80%",
						textAlign: "center",
						background: "rgba(0,0,0,0)",
						height: "30vh",
						maxHeight: "30vh",
						minHeight: "30vh",
					}}>
						{!editingBio ? bio : ""}
					</Typography >)
						: (
							<textarea
								id="bioTextField"
								label=""
								onBlur={stopEditingBio}
								onChange={updateBio}
								style={{
									width: "100%",
									minWidth: "80%",
									textAlign: "center",
									background: "rgba(0,0,0,0.25)",
									height: "30vh",
									maxHeight: "30vh",
									minHeight: "30vh",
									borderRadius: "2vw",
									border: 'none',
									outline: "none",
									padding: "2vh",
								}}
								className={`${classes.bio} ${classes.DMtext}`}
								value={bio}
							>

							</textarea>
							// <TextField
							// 	id="bioTextField"
							// 	label=""
							// 	multiline
							// 	rows={8}
							// 	rowsMax={8}
							// 	value={bio}
							// 	onBlur={stopEditingBio}
							// 	onChange={updateBio}
							// 	style={{
							// 		width: "100%",
							// 		textAlign:"center",
							// 	}}
							// />
						)}
				</Card><Card className={`${classes.card} ${classes.nameandPasswordCard}`}>
					<Typography variant="h5" className={`${classes.text} ${classes.infoLabel}`}>Username: </Typography>
					<Typography variant="h5" className={`${classes.text} ${classes.infoText}`}>@{userData.publicID}</Typography>
					<Typography variant="h5" className={`${classes.text} ${classes.infoLabel}`}>Tags: </Typography>
					<div className={`${classes.text} ${classes.infoText}`}> {renderChips(userData.tags)}</div>
				</Card><Card className={`${classes.card} ${classes.balanceCard}`}>
					<Typography variant="h5" className={`${classes.text} ${classes.infoText} ${classes.balanceText}`}>Balance: {userData.bal} <img src="https://i.ibb.co/Twp60L0/frog.png" height={window.innerHeight / 25} width={window.innerHeight / 25} style={{ verticalAlign: "middle", marginTop: window.innerHeight/-100 }} /></Typography>
				</Card>
				{/* <Card>
          <Typography
            variant="h5"
            style={{
              fontFamily: "Nunito",
              fontSize: "64px",
            }}
          >
            {userData.firstName} {userData.lastName}
          </Typography>
          <Avatar
            src={
              pfp ||
              "https://cdn1.iconfinder.com/data/icons/materia-human/24/013_003_account_profile_circle-512.png"
            }
            className={classes.large}
            style={{
              display: "inline-block",
            }}
            
          />
          <Typography
            variant="h5"
            style={{
              fontFamily: "Nunito",
            }}
          >
            @{userData.publicID}
          </Typography>
          <Paper
            style={{
              display: "inline-block",
              margin: "10",
              boxShadow: "none",
              background: theme ? "rgb(50,50,50)" : "rgb(230,230,230)",
            }}
          >
            {renderChips(userData.tags)}
          </Paper>
          <Container
            style={{
              display: "block",
            }}
          >
            <Paper
              style={{
                background: theme ? "rgb(70,70,70)" : "rgb(240,240,240)",
                margin: "10",
                boxShadow: "none",
                minHeight: "100px",
                maxWidth: "100%",
                minWidth: "100%",
                display: "inline-block",
              }}
            >
              <Typography variant="h5" onClick={handleEditBio}>
                {!editingBio ? bio : ""}
              </Typography>
              {editingBio ? (
                <TextField
                  id="bioTextField"
                  label=""
                  multiline
                  rowsMax={4}
                  value={bio}
                  onBlur={stopEditingBio}
                  onChange={updateBio}
                  style={{
                    width: "100%",
                  }}
                />
              ) : null}
            </Paper>
            <Typography variant="h1">Stats</Typography>
            <div
              style={{
                textAlign: "left",
                marginLeft: "5vw",
                marginRight: "5vw",
              }}
            >
              <Typography variant="h5">
                <b>User ID</b> {userData.privateID}
              </Typography>
              <Typography variant="h5">
                <b>Joined on</b>{" "}
                {moment(parseInt(userData.createdAt)).format(
                  "dddd MMMM Do h:mm:ss A"
                )}{" "}
                ( {moment(parseInt(userData.createdAt)).fromNow()} )
              </Typography>
              <Typography variant="h5">
                <b>Balance</b>{" "}
                {typeof userData.bal !== "undefined"
                  ? `${userData.bal} Coins`
                  : "Hidden"}
              </Typography>
            </div>
          </Container>
        </Card> */}
			</div>
		);
	}
	return null;
};

export default connect((state) => ({ UI: state.UI }))(
	withStyles(styles)(Profile)
);
