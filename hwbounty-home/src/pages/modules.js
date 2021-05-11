// React

import { Paper } from "@material-ui/core";
import CalculatorModule from "../components/Modules/Calculator/CalculatorModule";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadIt,
  root: {
    marginLeft: 300, // temporary until john fixes his stuff
    marginRight: 30,
    marginTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 30,
    minHeight: "80%",
    maxWidth: "80%",
  },
});

const Modules = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CalculatorModule />
    </div>
  );
};

export default withStyles(styles)(Modules);
