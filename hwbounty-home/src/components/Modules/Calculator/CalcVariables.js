// React
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// MUI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";

// Drag-n-Drop
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Redux
import { connect } from "react-redux";
import {
  calc_addVariable,
  calc_removeVariable,
} from "../../../redux/actions/moduleActions";

// Calculator
import VariableField from "./VariableField";

const styles = (theme) => ({
  ...theme.spreadIt,
  paper: {
    ...theme.spreadIt.paper,
    height: "80vh",
    display: "flex",
    flexDirection: "column",
  },
  variableWrapper: {
    flex: 1,
    overflow: "auto",
    paddingTop: 25,
  },
  deleteButton: {
    //margin: "auto",
    height: "100%",
    width: "100%",
  },
  addButton: {
    //margin: "auto",
    height: "100%",
    width: "100%",
  },
});

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

export const CalcVariables = (props) => {
  const {
    classes,
    calc_addVariable,
    calc_removeVariable,
    module: {
      calculator: { variables },
    },
    scope,
  } = props;

  const [useless, badCode] = useState(0);

  const addVariable = () => {
    // map over "common name variables" (abc...)
    // remove from array based on the variables we already have
    // we can make this over again cuz i'm lazy...
    // also not competitive programming soooo....
    // although O(n) space vs O(n) time so idk...
    let letters = "abcdefghijklmnopqrstuvwxyz".split("");
    let x = 1; // increase every loop, we append this to end of each letter until it works...
    let tmp = letters.filter((c) => {
      return !scope.has(c);
    });

    while (tmp.length === 0) {
      //eslint-disable-next-line
      tmp = letters.map((c) => c + `${x}`);
      tmp = tmp.filter((c) => {
        return !scope.has(c);
      });

      x++;
    }

    const varName = tmp[0];
    scope.set(varName, 1);
    forceUpdate();
  };

  const clearVariables = () => {
    scope.deleteAll();
    forceUpdate();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    // TODO: look at docs for dnd
    // use redux to store all variables + order
    // inject into parser on load i guess?
  };

  const forceUpdate = () => {
    badCode(useless + 1);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Paper className={classes.paper}>
        <div className={classes.variableWrapper}>
          {scope.localScope.size !== 0 ? (
            React.Children.toArray(
              Array.from(scope.localScope.entries()).map(([key, val]) => (
                <VariableField
                  scope={scope}
                  startName={key}
                  startVal={val}
                  updateList={forceUpdate}
                />
              ))
            )
          ) : (
            <h1>
              Type variables in text box (e.g. x=5) or press the button below
            </h1>
          )}
        </div>
        <Toolbar disableGutters>
          <Tooltip title="Add Variable" placement="top">
            <Button className={classes.addButton} onClick={addVariable}>
              <AddIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Clear All" placement="top">
            <Button className={classes.deleteButton} onClick={clearVariables}>
              <DeleteIcon color="error" />
            </Button>
          </Tooltip>
        </Toolbar>
      </Paper>
    </DragDropContext>
  );
};

CalcVariables.propTypes = {
  scope: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  module: state.module,
});

export default connect(mapStateToProps, {
  calc_addVariable,
  calc_removeVariable,
})(withStyles(styles)(CalcVariables));
