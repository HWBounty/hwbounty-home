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
import CalculatorBackend from "../../../util/calculator";

// required for latex to format correctly
addStyles();
const history = [];
const maths = math.create(math.all,{
  number : "BigNumber",
  precision: 64
})
const parser = maths.parser();
const styles = (theme) => ({
  ...theme.spreadIt,
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
        autoOperatorNames:
          "sin cos tan feet ft inches in miles cm sech arcsec arsinh to rad deg radians degrees",
        handlers: {
          enter: onSubmit,
        },
      }}
      onChange={onChange}
      mathquillDidMount={mathquillDidMount}
    />
  );
};

export const Calculator = (props) => {
  const { classes } = props;

  const [expression, setExpression] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const mathField = useRef(null);
  const handleInputChange = (val) => {
    setExpression(val.latex());
  };
    
  const handleSubmit = (val) => {
    try {
      const ans = CalculatorBackend.self.solveEquation(mathquillToMathJS(val.latex()));
      console.log(ans)
      if (!ans.steps.length){
        let ans = parser.evaluate(mathquillToMathJS(val.latex()));
        setAnswer(`${ans.toExponential(10)} `);
      }
      
      else
      setAnswer(ans.steps.pop().newEquation.ascii());
      setError(false);
    } catch (er){
      console.log(er);
      setAnswer("ERROR!!!!");
      setError(true);
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
    <Paper /*className={classes.paper}*/>
      <div /*className={classes.rootPadding}*/>
        <InputBase
          inputComponent={LatexInput}
          inputProps={{
            onChange: handleInputChange,
            onSubmit: handleSubmit,
            mathquillDidMount: handleMathquillMount,
          }}
          /*className={classes.input}*/
          value={expression}
          fullWidth
        ></InputBase>
        <Grid container spacing={2} /*className={classes.symbolPadGrid}*/ >
          <Grid item xs>
            <NumPad onClick={handleNumberPressed} />
          </Grid>
          <Grid item xs>
            <SymbolPad onClick={handleSymbolPressed} />
          </Grid>
        </Grid>
        <Typography color={error ? "error" : "initial"}>{answer}</Typography>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Calculator);
