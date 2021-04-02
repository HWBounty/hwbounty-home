// React
import React, { useState, useEffect } from "react";

// MUI
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// Math related
import mathquillToMathJS from "../../util/latex/preprocessMathQuill";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import { parser, parse } from "mathjs";

addStyles();
const math = parser();

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
      onSubmit={() => console.log("submitted??")}
    />
  );
};

export const Calculator = (props) => {
  const { classes } = props;

  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    try {
      const ans = math.evaluate(mathquillToMathJS(expression));
      setAnswer(ans);
    } catch (err) {}
  }, [expression]);

  const handleInputChange = (val) => {
    setExpression(val.latex());
  };

  return (
    <Paper className={classes.rootPaper}>
      <InputBase
        inputComponent={LatexInput}
        inputProps={{ onChange: handleInputChange }}
        value={expression}
        className={classes.input}
        fullWidth
      ></InputBase>
      <Typography>{answer}</Typography>
    </Paper>
  );
};

export default withStyles(styles)(Calculator);
