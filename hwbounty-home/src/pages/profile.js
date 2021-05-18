import {
	Avatar,
	Card,
	Chip,
	Fade,
	makeStyles,
	Modal,
	withStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
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
import { useAsyncResource } from 'use-async-resource';
import { Suspense } from "react";
import LoadingPage from "./loadingPage";
const fetchUser = (id) => 
	axios
		.get(
			`${hwbountyAPI}/user/${id}`
		)
		.catch((er) => {
			console.trace(er);
		}).then(res => res.data);
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
	const history = useHistory();
	let [userDat,getUserData] = useAsyncResource(fetchUser,`${history.location.pathname.split("/").pop()}`);
	useEffect(()=>
		history.listen(location =>{
			getUserData(`${location.pathname.split("/").pop()}`);
			
		})
	);
	
	return (<Suspense fallback={LoadingPage}><ProfileInfo userDat={userDat} theme={theme}/></Suspense>)
	
};
export const ProfileInfo = ({theme, userDat})=>{
	const userData = userDat();
	console.log(userData);
	const [error, setError] = useState(false);
	const [editingBio, setEditingBio] = useState(false);
	const classes = useStyles(theme);
	const [bio, setBio] = useState("");
	const [pfp, setPfp] = useState("");
	useEffect(()=>{
		setBio(userData.bio);
		setPfp(userData.pfp);
	},[userData])

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
			enqueueSnackbar(`Setting New Profile Picture...`);
			let allTypes=["data:image/gif;base64,","data:image/png;base64,","data:image/jpeg;base64,"]
			if (!allTypes.includes(e.target.result.substring(0,e.target.result.indexOf(",") + 1))) return enqueueSnackbar("Could not set profile picture! GIFs(Premium), JP(E)Gs and PNGs only please!",{
				variant: "error",
			})
			console.log(
				e.target.result.substring(0, 25),
				e.target.result.substring(e.target.result.indexOf(",") + 1)
			);
			await axios.post(`${hwbountyAPI}/changePfp`, {
				base64: e.target.result.substring(e.target.result.indexOf(",") + 1),
			});
			setPfp(e.target.result || event.target.value);
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


						<img src={pfp || "https://github.com/HWBounty/hwbounty-home/blob/gh-pages/logo512.png?raw=true"} className={`${classes.profileDiv} ${JSON.parse(localStorage.getItem("user"))?.privateID ===
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
					<Typography variant="h5" className={`${classes.text} ${classes.infoText} ${classes.balanceText}`}>Balance: {userData.bal} <img src="https://i.ibb.co/Twp60L0/frog.png" height={window.innerHeight / 25} width={window.innerHeight / 25} style={{ verticalAlign: "middle", marginTop: window.innerHeight / -100 }} /></Typography>
				</Card>
			</div>
		);
	}
	// throw "not ready!";
	return null;
}
export default connect((state) => ({ UI: state.UI }))(
	withStyles(styles)(Profile)
);
