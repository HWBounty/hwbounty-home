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

export const CalculatorFullscreen = (props) => {};

export const CalculatorLeftTab = (props) => {};

export const CalculatorRightTab = (props) => {};
