// MUI
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadIt,
});

export const CalcSettings = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div>hiiiiiiiii</div>
    </Paper>
  );
};

export default withStyles(styles)(CalcSettings);
