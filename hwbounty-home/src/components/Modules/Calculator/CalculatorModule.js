// React
import React, { useState, useEffect, useRef } from "react";

// MUI
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import Calculator from "./Calculator";
import CalcVariables from "./CalcVariables";

// Math related
import mathquillToMathJS from "../../../util/latex/preprocessMathQuill";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import * as math from "mathjs";
import { NumPad, SymbolPad } from "./CalcTools";

const parser = math.parser();

const styles = (theme) => ({
  ...theme.spreadIt,
  root: {
    margin: "auto",
  },
});

export const CalculatorModule = (props) => {
  const { classes } = props;

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <Calculator parser={parser} />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <CalcVariables parser={parser} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CalculatorModule);
