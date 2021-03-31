// React
import { useState } from "react";

// MUI
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// Math related
import mathquillToMathJS from "../../util/latex/preprocessMathQuill";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import { parser } from "mathjs";

addStyles();
const parse = parser();

const styles = (theme) => ({
  rootPaper: {
    height: "100%",
  },
});

// create custom latex input here
// autoCommands: 'pi theta sqrt sum',

const LatexInput = (props) => {
  const { onChange } = props;
  return (
    <EditableMathField
      latex=""
      style={{ height: "auto", fontSize: 50, flex: 1 }}
      config={{ autoCommands: "pi theta sqrt sum" }}
      onChange={onChange}
    />
  );
};

export const Calculator = (props) => {
  const { classes } = props;

  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState("");

  const handleInputChange = (val) => {
    setExpression(val.latex());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      console.log(expression);
      const ans = parse.evaluate(mathquillToMathJS(expression));
      setAnswer(ans);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper className={classes.rootPaper}>
      <form onSubmit={handleSubmit}>
        <InputBase
          inputComponent={LatexInput}
          inputProps={{ onChange: handleInputChange }}
          value={expression}
          className={classes.input}
          fullWidth
        ></InputBase>
      </form>
      <Button onClick={handleSubmit}>Submit</Button>
      <Typography>{answer}</Typography>
    </Paper>
  );
};

export default withStyles(styles)(Calculator);
