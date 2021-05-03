import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import theme from "../util/theme";
const useStyles = makeStyles((theme) => ({
	card: {
		width: "256px",

		display: "inline-block",
		margin: "25px",
		paddingTop: 0,
		height: "200px",
		zIndex: 100000000,
		boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)!important",
	},
	actionArea: {
		
	},
	media: {
		height: 120,
	},
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
	return (
		<Card className={classes.card} style={{
			background: theme ? color: color,
		}}>
			<CardActionArea onClick={() => redirect(path)} className={classes.actionArea}>
				<CardMedia
					className={classes.media}
					image={icon}
					title={name}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{name}
					</Typography>
					<Typography gutterBottom variant="body2" color="textSecondary" component="p">
						{desc}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
};
const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});

export default connect(mapStateToProps)(ModuleCard);