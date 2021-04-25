// React
import React, { useState, useEffect, useRef } from "react";

// MUI
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// Modules
import {
  CalculatorFullscreen,
  CalculatorLeftTab,
  CalculatorRightTab,
} from "./Calculator/CalculatorFullscreen";

export const FullscreenModuleViewer = (props) => {
  return (
    <Modal>
      <CalculatorFullscreen />
    </Modal>
  );
};

export default FullscreenModuleViewer;
