// MUI
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadIt,
});

export const CalcSettings = (props) => {
  return (
    <Paper>
      <div></div>
    </Paper>
  );
};

export default withStyles(styles)(CalcSettings);
