// React
import { useParams } from "react-router";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

// Modules
import Calculator from "../components/Modules/Calculator/CalculatorModule";
import EssayEditor from "../components/Modules/EssayEditor/EssayEditor";
import GasLaws from "../components/Modules/GasLaws";

const styles = (theme) => ({
  ...theme.spreadIt,
  root: {
    marginLeft: 100, // temporary until john fixes his stuff
    marginRight: 30,
    marginTop: 50,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 30,
    minHeight: "90%",
  },
});

const Modules = (props) => {
  const { classes } = props;
  const { module } = useParams();

  return (
    <div className={classes.root}>
      {module === "calculator" && <Calculator />}
      {module === "essayeditor" && <EssayEditor />}
      {module === "gaslaws" && <GasLaws />}
    </div>
  );
};

export default withStyles(styles)(Modules);
