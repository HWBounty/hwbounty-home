import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography, Zoom } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import theme from "../util/theme";
const useStyles = makeStyles((theme) => ({
	card: {
		width: "20vw",
		display: "flex",
		margin: "2.5%",
		paddingTop: 0,
		// height: "15vw",
		// zIndex: 100000000,
		boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)!important",
		flexDirection: "column",
		alignItems: "flex-start",
		borderRadius: "1vmin",
	},
	actionArea: {
		flexGrow: 1,
	},
	media: {
		minHeight: "10vw",
		height: "50%",
		filter: props => `brightness(${props.theme === 0 ? 70 : 30}%)`
	},
	name: {
		fontFamily: "Poppins",
		textAlign: "left",
		fontSize: "2em",
		fontWeight: "350",
	},
	desc: {
		fontFamily: "Nunito",
		textAlign: "left",
		fontSize: "1.2em"
	}
}));
export const ModuleCard = (props) => {
	const classes = useStyles(props);
	const history = useHistory();
	const redirect = (path) => {
		history.push(path);
	}
	const {
		icon,
		name,
		desc,
		path,
		color,
	} = props;
	const [zoom, setZoom] = useState(true);
	const [componentEnded, setComponentEnded] = useState(false);
	const endComponent = () => {
		setComponentEnded(true);
	}
	useEffect(() => {
		return () => setZoom(false);
	})
	if (componentEnded)
		return null;
	return (
		<Zoom
			in={true}
			onExit={endComponent}
		>
			<Card className={classes.card} style={{
				background: theme ? color : color,
			}}>
				<CardActionArea onClick={() => redirect(path)} className={classes.actionArea}>
					<CardMedia
						className={classes.media}
						image={icon || "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="}
						title={name}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2" className={`${classes.name}`}>
							{name}
						</Typography>
						<Typography gutterBottom variant="body2" color="textSecondary" component="p" className={`${classes.desc}`}>
							{desc}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Zoom>

	)
};
const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});

export default connect(mapStateToProps)(ModuleCard);