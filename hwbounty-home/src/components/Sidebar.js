import React, { useEffect } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import BuildIcon from "@material-ui/icons/Build";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import theme from "../util/theme";
import { AccountCircle, Home, LockOpen, Settings, Today } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AccountIconButton } from "./User/AccountIconButton";
import { Avatar, makeStyles, TextField } from "@material-ui/core";
import { PageSearch } from "./Home/PageSearch";
import useForceUpdate from "../util/useForceUpdate";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { SigninPopup } from "./SigninPopup";

const drawerWidth = 240;
/* Each Location Object
{
	path: "/",
	dataRun: (data) => {
		data.SetOpenSignout(true);
	},
	hideIfNotSignedIn: false,
}


*/
let locations = {
	Home: {
		path: "/",
		hideIfNotSignedIn: false,
		icon: <Home />,
	},
	Schedule: {
		path: "/schedule",
		hideIfNotSignedIn: false,
		icon: <Today />,
	},
	Modules: {
		path: "/modules",
		hideIfNotSignedIn: false,
		icon: <BuildIcon />,
	},
	Profile: {
		path: `/user/${JSON.parse(localStorage.getItem("user"))?.publicID}`,
		hideIfNotSignedIn: true,
		icon: <AccountCircle />,
	},

	Settings: {
		path: "/settings",
		hideIfNotSignedIn: false,
		icon: <Settings />,
	},
	"Sign Out":
	{
		dataRun: (data) => {
			data.SetOpenSignout(true);
		},
		hideIfSignedIn: false,
		hideIfNotSignedIn: true,
		icon: <ExitToAppIcon />,
	},
	"Sign In":
	{
		dataRun: (data) => {
			data.setOpenSignin(true);
		},
		hideIfSignedIn: true,
		icon: <LockOpen />,
	},
};
//updates profile Endpoint
setInterval(() => {
	locations = {
		...locations,
		Profile: {
			path: `/user/${JSON.parse(localStorage.getItem("user"))?.publicID}`,
			hideIfNotSignedIn: true,
			icon: <AccountCircle />,
		},
	};
}, 2000);

const styles = (theme) => ({
	...theme.spreadIt,
});
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	anchoredAvatar: {
		position: "fixed",
		top: "1.05%",
		left: "1%",
	},
	clickThing: {
		position: "fixed",
		top: "1%",
		bottom: "auto",
		right: "auto",
		left: "1%",
		zIndex: 10000,
		[theme.breakpoints.down(960)]: {
			bottom: "1%",
			right: "1%",
			zIndex: 10000,
			top: "auto",
			left: "auto",
		}
	}
}));

export const Sidebar = (props) => {

	const classes = useStyles();
	const {
		UI: { theme },
		user: { authenticated },
	} = props;
	const [open, setOpen] = React.useState(false);
	const history = useHistory();
	const forceUpdate = useForceUpdate();
	const [openSignout, SetOpenSignout] = React.useState(false);
	const [openSignin, setOpenSignin] = React.useState(false);
	const data = {
		SetOpenSignout,
		openSignout,
		openSignin,
		setOpenSignin,

	}
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	useEffect(() => {
		let i = setInterval(() => forceUpdate(), 500);
		return () => clearInterval(i);
	}, []);
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const onClckItem = (name) => {
		if (locations[name]?.dataRun)
			locations[name].dataRun(data);
		if (locations[name]?.path) {

			history.push(locations[name]?.path);
		}

		handleDrawerClose();
	};

	const UserButton = () => {
		return (
			<div>
				<Avatar
					src={JSON.parse(localStorage.getItem("user"))?.pfp}
					height={64}
					width={64}
					align="left"
					className={classes.anchoredAvatar}
				/>
			</div>
		);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(e, document.getElementById("goPage").value);
	};
	const confirmSignout = (res) => {
		SetOpenSignout(false);
		if (res) {
			localStorage.clear();
			window.location.reload();
		}
	}
	const getIcon = () => {
		return <IconButton
			color="inherit"
			aria-label="open drawer"
			onClick={handleDrawerOpen}
			style={{

				display: open && "none",
			}}
			className={`${clsx(classes.menuButton, open && classes.hide)} ${classes.clickThing}`}
		>
			<MenuIcon />
		</IconButton>
	}
	return (
		<div
			style={{
				zIndex: 1000000000,
			}}
		>
			{
				getIcon()
			}
			<Dialog
				open={openSignout}
				onClose={() => confirmSignout(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				{/* <DialogTitle><Typography variant="h5">Are you sure you would like to sign out?</Typography></DialogTitle> */}
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<Typography style={{
							fontSize: "1.5rem"
						}}>Are you sure you would like to sign out?</Typography>
						<br />
						Signing out also clears: <br />
						- Dark mode/light mode preference.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => confirmSignout(false)} color="primary">
						No
					</Button>
					<Button onClick={() => confirmSignout(true)} color="primary" autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
			<SigninPopup authOpen={openSignin} setter={setOpenSignin} />
			<Drawer
				className={classes.drawer}
				//variant="persistent"
				anchor={window.innerWidth > 960 ? "left" : "right"}
				open={open}
				onClose={handleDrawerClose}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<form onSubmit={onSubmit}>
						<TextField placeholder="Quick Search" id="goPage" />
					</form>
					{/* <UserButton /> */}
					{/* <Typography>{JSON.parse(localStorage.getItem("user"))?.firstName || " "} {JSON.parse(localStorage.getItem("user"))?.lastName || " "}</Typography> */}
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					{Object.keys(locations)

						.filter(name => {
							let item = locations[name];
							if (item.hideIfNotSignedIn)
								return authenticated;
							if (item.hideIfSignedIn)
								return !authenticated;
							return true;
						})
						.map((text, index) => (
							<ListItem button key={text} onClick={(x) => onClckItem(text)}>
								<ListItemIcon>
									{
										locations[text].icon
									}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
				</List>
				{/* <Divider />
		<List>
			{['All mail', 'Trash', 'Spam'].map((text, index) => (
				<ListItem button key={text}>
					<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			))}
		</List> */}
			</Drawer>
		</div>
	);
};

const mapStateToProps = (state) => ({
	UI: state.UI,
	user: state.user,
});


export default connect(mapStateToProps)((Sidebar));
