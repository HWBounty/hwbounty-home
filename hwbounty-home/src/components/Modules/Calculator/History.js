// React
import React, { useState } from "react";

// MUI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Redux
import { connect } from "react-redux";
import { calc_setInput } from "../../../redux/actions/moduleActions";

// Math
import { StaticMathField } from "react-mathquill";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    overflow: "auto",
  },
}));

export const History = (props) => {
  const {
    module: {
      calculator: { history },
    },
    calc_setInput,
  } = props;

  const classes = useStyles();

  const HistoryButton = (props) => {
    const { latex, ans } = props;
    return (
      <ListItem button onClick={() => calc_setInput(latex)}>
        <StaticMathField style={{ flex: 1, cursor: "pointer" }}>
          {latex}
        </StaticMathField>
        <Typography>= {ans}</Typography>
      </ListItem>
    );
  };

  return (
    <div className={classes.root}>
      <List>
        {React.Children.toArray(
          history.map((x) => (
            <>
              <Divider />
              <HistoryButton latex={x.latex} ans={x.ans} />
            </>
          ))
        )}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => ({
  module: state.module,
});

export default connect(mapStateToProps, { calc_setInput })(History);
