// React

import { Paper } from "@material-ui/core";
import Calculator from "../components/Modules/Calculator/Calculator";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadIt,
  root: {
    marginLeft: 300, // temporary until john fixes his stuff
    marginRight: 30,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 30,
  },
});

const Modules = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Calculator />
    </Paper>
  );
};

export default withStyles(styles)(Modules);
