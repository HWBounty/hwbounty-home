import { Button, Card, Chip, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import { useSnackbar } from "notistack";
import React from "react";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useAsyncResource } from "use-async-resource";
import { hwbountyAPI } from "../redux/types";
import badges from "../util/badges";
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
const useStyles = makeStyles({
	mainCard: {
		width: "90vw",
		height: "90vh",
		marginLeft: "5vw",
		marginTop: "5vh",
		display: "flex",
	},
	profileCard: {
		minWidth: "25rem",
		width: "25vw",
		height: "90vh",
		alignSelf: "left",
		display: "flex",

		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "column"


	},
	name: {
		fontSize: "4rem",
		textAlign: "center",
		width: "100%",
		fontFamily: "Oswald",
	},
	handle: {
		fontFamily: "Poppins",
		fontSize: "2rem",
		fontWeight: "300",
	},
	materialCard: {
		boxShadow: "5px 5px 18px 0px rgba(0,0,0,0.5)!important",
		borderRadius: "2vw",

	},
	profileDiv: {
		marginTop: "5vh",
		borderRadius: 1000,
		width: "15rem",
		height: "15rem",
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
	textColor: {
		color: (theme) => theme === 1 ? "rgb(255,255,255)" : "rgb(10,10,10)"
	},
	bio: {
		marginTop: "1rem",
		paddingTop: "0.5rem",
		fontFamily: "Nunito",
		fontSize: "1.33rem",
		lineHeight: "1.25",
		maxWidth: "90%",

	},
	bioText: {
		width: "100%",
		minWidth: "80%",
		textAlign: "center",
		background: "rgba(0,0,0,0)",
		height: "30vh",
		maxHeight: "30vh",
		minHeight: "30vh",
	},
	bioTextField: {
		width: "100%",
		minWidth: "80%",
		textAlign: "center",
		background: "rgba(0,0,0,0.25)",
		height: "50vh",
		maxHeight: "50vh",
		minHeight: "50vh",
		border: 'none',
		outline: "none",
	},
	dataDiv: {
		width: "calc(90vw - 25rem)",
		// marginLeft: "5rem",
		// background: "rgb(25,25,25)",
		padding: "5rem",
		height: "100%",
		display: "flex",
		flexDirection: "column",

	},
	tagsInfo: {
		fontFamily: "Poppins",
		fontSize: "1.5rem",
		textAlign: "left",

	},
	tagsDiv: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		flexWrap: "wrap",
	},
	propertyCard: {
		minWidth: "25rem",
		width: "25vw",
		minHeight: "17.5rem",
		height: "17.5vh",
		display: "flex",
		flexDirection: "column",
		// justifyContent: "center",s
		alignItems: "center",
		margin: "2rem",
	},
	propertyCardImage: {
		minWidth: "8rem",
		width: "8vw",
		minHeight: "8rem",
		height: "8vw",
		background: (theme) => theme === 1 ? "#3a393cff" : "#f2f3f5ff",
		position: "absolute",
		transform: "translate(0%,-50%)",
		padding: ".33rem",
		borderRadius: "1000vw",
	},
	dummySpace: {
		minWidth: "8rem",
		width: "8vw",
		minHeight: "3.75rem",
		height: "3.75vw",
		background: "rgba(0,0,0,0)",
	},
	propertiesDiv: {
		flexGrow: "1",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	darkerCard: {
		background: (theme) => theme === 1 ? "#3a393cff" : "#f2f3f5ff",
	},
	balanceLabel: {
		fontFamily: "Poppins",
		fontSize: "1.5rem",
		fontWeight: "200"
	},
	balanceText:{
		fontFamily: "Oswald",
		fontSize: "3rem",
	},
	balInfoButton: {
		fontFamily: "Poppins",
		fontWeight: "300",
		textTransform: "none"
	}

});
export const Profile = (props) => {
	const {
		UI: { theme },
	} = props;
	const history = useHistory();
	let [userDat, getUserData] = useAsyncResource(fetchUser, `${history.location.pathname.split("/").pop()}`);
	useEffect(() =>
		history.listen(location => {
			getUserData(`${location.pathname.split("/").pop()}`);

		})
	);

	return (<Suspense fallback={LoadingPage}><ProfileInfo userDat={userDat} theme={theme} /></Suspense>)

};
export const ProfileInfo = ({ theme, userDat }) => {

	const classes = useStyles(theme);
	const userData = userDat();
	console.log(userData);
	const [error, setError] = useState(false);
	const [editingBio, setEditingBio] = useState(false);
	const [bio, setBio] = useState("");
	const [pfp, setPfp] = useState("");
	useEffect(() => {
		setBio(userData.bio);
		setPfp(userData.pfp);
	}, [userData])

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
						size={(window.innerHeight * window.innerWidth) ** 0.02}
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
			let allTypes = ["data:image/gif;base64,", "data:image/png;base64,", "data:image/jpeg;base64,"]
			if (!allTypes.includes(e.target.result.substring(0, e.target.result.indexOf(",") + 1))) return enqueueSnackbar("Could not set profile picture! GIFs(Premium), JP(E)Gs and PNGs only please!", {
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
				<Card className={`${classes.mainCard} ${classes.materialCard}`}>
					<Card className={`${classes.profileCard} ${classes.materialCard} ${classes.darkerCard}`}>
						<div>
							<img src={pfp || "https://github.com/HWBounty/hwbounty-home/blob/gh-pages/logo512.png?raw=true"}
								className={`${classes.profileDiv} ${JSON.parse(localStorage.getItem("user"))?.privateID === userData.privateID && classes.hoverBlur}`}
								onClick={
									JSON.parse(localStorage.getItem("user"))?.privateID ===
									userData.privateID && onClickPfp
								}
								alt="Profile pic"></img>
							<Typography className={classes.name}>{userData.firstName} {userData.lastName}</Typography>
							<Typography className={classes.handle}>@{userData.publicID}</Typography>
						</div>
						{!editingBio ?
							(
								<Typography onClick={handleEditBio} className={`${classes.bio} ${classes.bioText}`}>
									{!editingBio ? bio : ""}
								</Typography >
							)
							:
							(
								<textarea
									id="bioTextField"
									label=""
									onBlur={stopEditingBio}
									onChange={updateBio}
									className={`${classes.bio} ${classes.textColor} ${classes.bioTextField}`}
									value={bio}
								/>
							)}

					</Card>
					<div className={`${classes.dataDiv}`}>
						<Typography className={`${classes.tagsInfo}`}>
							Tags:
						</Typography>
						<div className={`${classes.tagsDiv}`}>
							{renderChips(userData.tags)}
						</div>
						<div className={`${classes.propertiesDiv}`}>
							<Card className={`${classes.propertyCard} ${classes.materialCard} ${classes.darkerCard}`}>
								<img src="https://github.com/HWBounty/hwbounty-home/blob/gh-pages/logo512.png?raw=true" className={`${classes.propertyCardImage}`} />
								<div className={classes.dummySpace}/>
								<Typography className={classes.balanceLabel}>
									Balance
								</Typography>
								<Typography className={classes.balanceLabel}>
									&nbsp;
								</Typography>
								<Typography className={classes.balanceText}>
									{userData.bal}
								</Typography>
								<Typography className={classes.balanceLabel}>
									&nbsp;
								</Typography>
								<Button className={classes.balInfoButton}>
									Learn About Coins
								</Button>
							</Card>
							<Card className={`${classes.propertyCard} ${classes.materialCard} ${classes.darkerCard}`}>
								<img src="https://cdn.discordapp.com/avatars/747901310749245561/0d1cca7ffaa402de6a0d73e28734c13f.png?size=" className={`${classes.propertyCardImage}`} />
								
								<div className={classes.dummySpace}/>
								<Typography className={classes.balanceLabel}>
									School
								</Typography>
								<Typography className={classes.balanceLabel}>
									&nbsp;
								</Typography>
								<Typography className={classes.balanceText}>
									N/A
								</Typography>
								<Typography className={classes.balanceLabel}>
									&nbsp;
								</Typography>
								<Button className={classes.balInfoButton}>
									What is this?
								</Button>
							</Card>
						</div>

					</div>
				</Card>
			</div>
		);
	}

};
export default connect((state) => ({ UI: state.UI }))(
	Profile
);
