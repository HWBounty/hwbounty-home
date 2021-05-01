import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import theme from "../util/theme";
import { AccountCircle, Home, Settings, Today } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getTheme } from './Home/Navbar';
const drawerWidth = 240;
const locations = {
	Home: "/",
	Schedule: "/schedule",
	Profile: `/user/${JSON.parse(localStorage.getItem("user"))?.publicID}`,
	"Sign Out": ()=>{
		localStorage.clear();
		window.location.reload();
	},
	Settings: "/settings",
}
const styles = (theme) => ({
	...theme.spreadIt,
});
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
}));


export const Sidebar = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const history = useHistory();
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const onClckItem = (name)=>{
		if (typeof locations[name] === "string")
		history.push(locations[name]);
		else
			locations[name]();
		handleDrawerClose();
	}

	return (<div style={{
		zIndex: 1000000000,
	}}>
		{!open ? (<IconButton
		color="inherit"
		aria-label="open drawer"
		onClick={handleDrawerOpen}
		style={{
			position: "fixed",
			top: "1%",
			left: "1%",
			zIndex: 10000,
			display: open && "none"
		}}
		className={clsx(classes.menuButton, open && classes.hide)}
	>
		<MenuIcon />
	</IconButton>) : (<Drawer
		className={classes.drawer}
		variant="persistent"
		anchor="left"
		open={open}
		classes={{
			paper: classes.drawerPaper,
		}}
		style={{
			display: "block",
		}}
	>
		<div className={classes.drawerHeader}>
			<IconButton onClick={handleDrawerClose}>
				{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
			</IconButton>
		</div>
		<Divider />
		<List>
			{['Home', 'Schedule', 'Profile','Sign Out','Settings'].map((text, index) => (
				<ListItem button key={text} onClick={x=>onClckItem(text)} >
					<ListItemIcon>{[<Home />,<Today />, <AccountCircle />, <ExitToAppIcon /> , <Settings /> ][index]}</ListItemIcon>
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
	</Drawer>)}</div>)
};
export default withStyles(styles)(Sidebar);
