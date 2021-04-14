// React
import { Fragment, useState } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

// Modules
import Calculator from "./Calculator/Calculator";
import EssayEditor from "./EssayEditor/EssayEditor";

const styles = {
  root: {
    height: "100%",
    flex: 1,
  },
};

export const ModuleViewer = (props) => {
  const {
    classes,
    UI: { module },
  } = props;

  const Module = (props) => {
    switch (module) {
      case 1:
        return <Calculator />;
      case 2:
        return <EssayEditor />;
      case 0:
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <Module />
    </div>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(ModuleViewer));
