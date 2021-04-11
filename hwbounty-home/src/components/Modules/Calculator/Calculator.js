// React
import React, { useState, useEffect, useRef } from "react";

// MUI
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// Math related
import mathquillToMathJS from "../../../util/latex/preprocessMathQuill";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import * as math from "mathjs";
import { NumPad, SymbolPad } from "./CalcTools";

// required for latex to format correctly
addStyles();
const history = [];
const parser = math.parser();

const styles = (theme) => ({
  rootPaper: {
    height: "100%",
  },
  rootDiv: {
    padding: 25,
  },
  symbolPadGrid: {
    paddingTop: 15,
  },
});

const LatexInput = (props) => {
  const { onChange, onSubmit, mathquillDidMount } = props;

  return (
    <EditableMathField
      latex=""
      style={{ height: "auto", fontSize: 50, flex: 1 }}
      config={{
        autoCommands: "pi theta sqrt sum",
        handlers: {
          enter: onSubmit,
        },
      }}
      //onChange={onChange}
      onChange={onChange}
      mathquillDidMount={mathquillDidMount}
    />
  );
};

export const Calculator = (props) => {
  const { classes } = props;

  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState("");

  const mathField = useRef(null);

  // useEffect(() => {
  //   try {
  //     const ans = math.evaluate(mathquillToMathJS(expression));
  //     console.log(ans);
  //     setAnswer(ans);
  //   } catch (err) {}
  // }, [expression]);

  const handleInputChange = (val) => {
    setExpression(val.latex());
  };

  const handleSubmit = (val) => {
    try {
      const ans = parser.evaluate(mathquillToMathJS(val.latex()));
      setAnswer(ans);
      console.log(val.latex(), ans);
    } catch {
      console.log("error");
    }
  };

  const handleMathquillMount = (val) => {
    mathField.current = val;
  };

  const handleNumberPressed = (num) => {
    mathField.current.write(num);
    mathField.current.focus();
  };

  const handleSymbolPressed = (symbol) => {
    mathField.current.cmd(symbol);
    mathField.current.focus();
  };

  return (
    <Paper className={classes.rootPaper}>
      <div className={classes.rootDiv}>
        <InputBase
          inputComponent={LatexInput}
          inputProps={{
            onChange: handleInputChange,
            onSubmit: handleSubmit,
            mathquillDidMount: handleMathquillMount,
          }}
          className={classes.input}
          value={expression}
          fullWidth
        ></InputBase>
        <Grid container spacing={2} className={classes.symbolPadGrid}>
          <Grid item xs={5}>
            <NumPad onClick={handleNumberPressed} />
          </Grid>
          <Grid item xs={7}>
            <SymbolPad onClick={handleSymbolPressed} />
          </Grid>
        </Grid>
        <Typography>{answer}</Typography>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Calculator);
